import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  booking_orders,
  booking_order_details,
  special_offers,
} from 'models/booking/bookingSchema';
import {
  facilities,
  facilities_support,
  facility_photos,
  hotel_reviews,
  hotels,
} from 'models/booking/hotelSchema';
import {
  address,
  category_group,
  city,
  country,
  members,
  policy,
  provinces,
  regions,
} from 'models/booking/masterSchema';
import { user_members, users } from 'models/booking/usersSchema';
import { Op } from 'sequelize';

@Injectable()
export class BookhotelsService {
  constructor(
    @InjectModel(hotels) private hotelsModel: typeof hotels,
    @InjectModel(facilities) private facilitiesModel: typeof facilities,
    @InjectModel(booking_order_details)
    private bookingOrderDetailsModel: typeof booking_order_details,
    @InjectModel(special_offers)
    private specialOffersModel: typeof special_offers,
    @InjectModel(booking_orders)
    private bookingOrdersModel: typeof booking_orders,
  ) {}

  async findHotels(
    page: number,
    limit: number,
    cityName: string,
    provName: string,
    countryName: string,
    regionName: string,
    facilities_support_filter: number[],
  ) {
    try {
      const dataBookingHotels = await this.facilitiesModel
        .findAll({
          attributes: [
            'faci_id',
            'faci_name',
            'faci_room_number',
            'faci_startdate',
            'faci_enddate',
            'faci_discount',
            'faci_tax_rate',
            'faci_rate_price',
            'faci_memb_name',
          ],
          include: [
            {
              model: hotels,
              include: [
                {
                  model: address,
                  include: [
                    {
                      model: city,
                      where: cityName
                        ? { city_name: { [Op.iLike]: `%${cityName}%` } }
                        : {},
                      include: [
                        {
                          model: provinces,
                          where: provName ? { prov_name: provName } : {},
                          include: [
                            {
                              model: country,
                              where: countryName
                                ? { country_name: countryName }
                                : {},
                              include: [
                                {
                                  model: regions,
                                  where: regionName
                                    ? { region_name: regionName }
                                    : {},
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  model: hotel_reviews,
                  attributes: ['hore_rating'],
                },
              ],
            },
          ],
        })
        .catch((err: any) => {
          throw err;
        });

      const dataFaciPhoto = await this.facilitiesModel.findAll({
        include: {
          model: facility_photos,
        },
      });

      const dataHotel = await this.hotelsModel.findAll({
        include: [
          {
            model: facilities_support,
            where: facilities_support_filter
              ? { fs_name: facilities_support_filter }
              : {},
          },
        ],
      });

      const hotelsData = dataHotel.reduce((acc, hotel) => {
        acc[hotel.hotel_id] = {
          facilities_support: hotel.facilities_support,
        };
        return acc;
      }, {});

      const dataBookingHotelsWithFacilities = dataBookingHotels.map(
        (facility) => {
          const hotelData = hotelsData[facility.hotel.hotel_id];
          return {
            ...JSON.parse(JSON.stringify(facility)),
            hotel: {
              ...JSON.parse(JSON.stringify(facility.hotel)),
              ...hotelData,
            },
          };
        },
      );

      const dataBookingHotelsWithPhotos = dataBookingHotelsWithFacilities.map(
        (facility) => {
          const facilityPhotos = dataFaciPhoto.find(
            (fp) => fp.faci_id === facility.faci_id,
          )?.facility_photos;
          return {
            ...facility,
            facility_photos: facilityPhotos,
          };
        },
      );

      let filteredData = [];
      if (dataBookingHotelsWithPhotos) {
        filteredData = dataBookingHotelsWithPhotos.filter((data) => {
          return data.hotel.address !== null;
        });

        if (facilities_support_filter) {
          filteredData = filteredData.filter((data) => {
            if (data.hotel.facilities_support) {
              return data.hotel.facilities_support.some((fs: any) =>
                facilities_support_filter.includes(fs.fs_name),
              );
            }
            return false;
          });
        }
      }

      const totalData = filteredData.length;
      // const startIndex = (page - 1) * limit;
      // const endIndex = page * limit;
      // let data = filteredData.slice(startIndex, endIndex);
      let data = [...filteredData];

      data = data.map((e: any) => {
        let sumRating = 0;
        let sumRatingLength = 0;
        const jumlahReviewsHotel = e.hotel.hotel_user_reviews
          ? e.hotel.hotel_user_reviews.length
          : 0;
        const hotelReviewsAtr = {
          ...e.hotel,
          hotel_reviews_count: jumlahReviewsHotel,
        };
        if (hotelReviewsAtr.hotel_user_reviews) {
          hotelReviewsAtr.hotel_user_reviews.forEach((hr: any) => {
            sumRating += hr.hore_rating;
            sumRatingLength++;
          });
        }

        const hotelRatingStarAverage = {
          ...hotelReviewsAtr,
          hotel_rating_star:
            sumRating / sumRatingLength
              ? (sumRating / sumRatingLength).toString()
              : Number(0).toString(),
        };

        // console.log('hotelRatingStarAverage', hotelRatingStarAverage);

        let ratingDescription = '';
        const ratingStar = parseFloat(hotelRatingStarAverage.hotel_rating_star);

        if (ratingStar >= 4.5) {
          ratingDescription = 'Excellent';
        } else if (ratingStar >= 4) {
          ratingDescription = 'Very Good';
        } else if (ratingStar >= 3.5) {
          ratingDescription = 'Good';
        } else if (ratingStar >= 3) {
          ratingDescription = 'Fair';
        } else {
          ratingDescription = 'Poor';
        }

        // console.log('ratingDescription', ratingDescription);

        return {
          ...e,
          faci_keterangan_book: 'per room per night',
          hotel: {
            ...hotelRatingStarAverage,
            hotel_rating_status: ratingDescription,
          },
        };
      });

      return { totalData, data };
    } catch (error) {
      console.log(error);
    }
  }

  async findFaciById(
    idHotel: string,
    dataIdFilter: any,
    startDate: string,
    endDate: string,
  ) {
    try {
      const dataFaciBook = await this.facilitiesModel
        .findAll({
          attributes: [
            'faci_id',
            'faci_name',
            'faci_room_number',
            'faci_startdate',
            'faci_enddate',
            'faci_discount',
            'faci_tax_rate',
            'faci_rate_price',
            'faci_max_number',
            'faci_memb_name',
          ],
          where: {
            faci_id: {
              [Op.in]: dataIdFilter,
            },
          },
          include: [
            {
              model: hotels,
              where: {
                hotel_id: idHotel,
              },
              include: [
                {
                  model: address,
                  include: [
                    {
                      model: city,
                      include: [
                        {
                          model: provinces,
                          include: [
                            {
                              model: country,
                              include: [
                                {
                                  model: regions,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  model: hotel_reviews,
                  include: [
                    {
                      model: users,
                    },
                  ],
                },
                {
                  model: facilities_support,
                },
              ],
            },
            {
              model: facility_photos,
            },
            {
              model: category_group,
              where: { cagro_name: 'Room' },
              include: [
                {
                  model: policy,
                  attributes: ['poli_id', 'poli_name', 'poli_description'],
                },
              ],
            },
          ],
        })
        .catch((err: any) => {
          console.log(err);
          throw err;
        });
      console.log('dataFaciBook lohmas', dataFaciBook);

      const dataFaciBookUp = dataFaciBook.map((data: any) => {
        let priceRate = 0;
        const hore_reviews: any[] = data.hotel.hotel_user_reviews;
        const ratings_count: { [key: string]: number } = {
          '5': 0,
          '4': 0,
          '3': 0,
          '2': 0,
          '1': 0,
        };
        if (data.faci_rate_price.length > 0) {
          priceRate = parseInt(data.faci_rate_price.replace(/[^0-9.-]+/g, ''));

          const start = new Date(startDate);
          const end = new Date(endDate);
          const diff = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
          );

          const priceAfterDiscount =
            (data.faci_rate_price * data.faci_discount) / 100;
          let subTotal = data.faci_rate_price - priceAfterDiscount;

          if (diff) {
            subTotal *= diff;
          }

          let faciRatePrice: any;
          if (diff) {
            faciRatePrice =
              parseInt(data.faci_rate_price.replace(/[^0-9.-]+/g, '')) * diff;
          } else {
            faciRatePrice = parseInt(
              data.faci_rate_price.replace(/[^0-9.-]+/g, ''),
            );
          }
          const rpSubTotal = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(subTotal);
          const rpFaciRatePrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(faciRatePrice);

          for (const review of data.hotel.hotel_user_reviews) {
            ratings_count[review.hore_rating.toString()] += 1;
          }

          const total_reviews = hore_reviews.length;
          const percentages: { [key: string]: string } = {
            '5': `${
              Math.round((ratings_count['5'] / total_reviews) * 100)
                ? Math.round((ratings_count['5'] / total_reviews) * 100)
                : 0
            }%`,
            '4': `${
              Math.round((ratings_count['4'] / total_reviews) * 100)
                ? Math.round((ratings_count['4'] / total_reviews) * 100)
                : 0
            }%`,
            '3': `${
              Math.round((ratings_count['3'] / total_reviews) * 100)
                ? Math.round((ratings_count['3'] / total_reviews) * 100)
                : 0
            }%`,
            '2': `${
              Math.round((ratings_count['2'] / total_reviews) * 100)
                ? Math.round((ratings_count['2'] / total_reviews) * 100)
                : 0
            }%`,
            '1': `${
              Math.round((ratings_count['1'] / total_reviews) * 100)
                ? Math.round((ratings_count['1'] / total_reviews) * 100)
                : 0
            }%`,
          };

          let sumRating = 0;
          let sumRatingLength = 0;
          const jumlahReviewsHotel = data.hotel.hotel_user_reviews.length;
          const hotelReviewsAtr = {
            ...data.hotel,
            hotel_reviews_count: jumlahReviewsHotel,
          };

          hotelReviewsAtr.hotel_user_reviews.forEach((hr: any) => {
            sumRating += hr.hore_rating;
            sumRatingLength++;
          });

          const hotelRatingStarAverage = {
            ...hotelReviewsAtr,
            hotel_rating_star:
              sumRating / sumRatingLength
                ? (sumRating / sumRatingLength).toString()
                : Number(0).toString(),
          };

          let ratingDescription = '';
          const ratingStar = parseFloat(
            hotelRatingStarAverage.hotel_rating_star,
          );

          if (ratingStar >= 4.5) {
            ratingDescription = 'Excellent';
          } else if (ratingStar >= 4) {
            ratingDescription = 'Very Good';
          } else if (ratingStar >= 3.5) {
            ratingDescription = 'Good';
          } else if (ratingStar >= 3) {
            ratingDescription = 'Fair';
          } else {
            ratingDescription = 'Poor';
          }

          const dataObject = {
            ...data.toJSON(),
            faci_rate_price: rpFaciRatePrice,
            faci_subtotal: rpSubTotal,
            count_night: `${diff} malam`,
            checkin: start,
            checkout: end,
            hotel: {
              ...data.hotel.toJSON(),
              hotel_review_percentages: percentages,
              hotel_rating_final_star: ratingStar,
              hotel_review_count: jumlahReviewsHotel,
              hotel_rating_status: ratingDescription,
            },
          };
          delete dataObject.parent;

          return dataObject;
        }
      });

      return dataFaciBookUp;
    } catch (error) {
      return error;
    }
  }

  async findAllRoomsByCategoryAndHotel(
    IdHotel: string,
    NotRoomName: string,
    IdCagro: string,
  ) {
    try {
      const dataAllRooms = await this.facilitiesModel
        .findAll({
          attributes: [
            'faci_id',
            'faci_name',
            'faci_room_number',
            'faci_discount',
            'faci_tax_rate',
            'faci_high_price',
            'faci_rate_price',
            'faci_max_number',
          ],
          where: {
            faci_name: {
              [Op.notILike]: NotRoomName,
            },
          },
          include: [
            {
              model: facility_photos,
              where: { fapho_primary: '1' },
            },
            {
              model: hotels,
              attributes: ['hotel_id', 'hotel_name'],
              where: { hotel_id: IdHotel },
            },
            {
              model: category_group,
              where: { cagro_id: Number(IdCagro) },
            },
          ],
        })
        .catch((err: any) => {
          console.log(err);
        });
      return dataAllRooms;
    } catch (err) {
      return err;
    }
  }

  async getAllListSameRoom(
    IdHotel: number,
    IdRoom: number,
    SeriesRoom: string,
  ) {
    try {
      const dataListSameRoom = await this.facilitiesModel.findAll({
        where: {
          faci_hotel_id: IdHotel,
          faci_name: SeriesRoom,
          faci_id: {
            [Op.ne]: IdRoom,
          },
        },
      });
      return dataListSameRoom;
    } catch (err) {
      return err;
    }
  }

  async getFinalBookingRooms(
    IdOrderDetail: number,
    IdUser: number,
    Checkin: any,
    Checkout: any,
    TotalGuest: number,
    TotalRooms: number,
  ) {
    try {
      const dataUser = await users.findOne({
        where: { user_id: IdUser },
        include: [{ model: members }],
      });

      const dataOrderDetail = await this.bookingOrderDetailsModel.findAll({
        include: [
          {
            model: facilities,
            include: [
              {
                model: hotels,
                include: [
                  {
                    model: address,
                    include: [
                      {
                        model: city,
                        include: [
                          {
                            model: provinces,
                            include: [
                              {
                                model: country,
                                include: [
                                  {
                                    model: regions,
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    model: hotel_reviews,
                  },
                ],
              },
            ],
          },
        ],
        where: {
          border_boor_id: IdOrderDetail,
        },
      });

      // return dataOrderDetail;
      let bonusMember = 0;
      dataOrderDetail.forEach((data: any) => {
        dataUser.members.forEach((item: any) => {
          if (data.facility.faci_memb_name === item.memb_name) {
            bonusMember = bonusMember + item.user_members.usme_points;
          }
        });
      });

      let ratingStarStatus = '';

      if (Number(dataOrderDetail[0].facility.hotel.hotel_rating_star) >= 4.5) {
        ratingStarStatus += 'Excellent';
      } else if (
        Number(dataOrderDetail[0].facility.hotel.hotel_rating_star) >= 4
      ) {
        ratingStarStatus += 'Very Good';
      } else if (
        Number(dataOrderDetail[0].facility.hotel.hotel_rating_star) >= 3.5
      ) {
        ratingStarStatus += 'Good';
      } else if (
        Number(dataOrderDetail[0].facility.hotel.hotel_rating_star) >= 3
      ) {
        ratingStarStatus += 'Fair';
      } else {
        ratingStarStatus += 'Poor';
      }

      let totalPrice = 0;
      let subTotal = 0;

      dataOrderDetail.forEach((data) => {
        const priceTotalConverse = parseFloat(
          data.borde_price.replace(/[^0-9.-]+/g, ''),
        );
        const subTotalConverse = parseFloat(
          data.borde_subtotal.replace(/[^0-9.-]+/g, ''),
        );

        totalPrice = totalPrice + priceTotalConverse;
        subTotal = subTotal + subTotalConverse;
      });

      subTotal = subTotal - bonusMember;

      // let boor_border_hotel_rating_length: any;
      // if (
      //   dataOrderDetail[0].facility &&
      //   dataOrderDetail[0].facility.hotel &&
      //   dataOrderDetail[0].facility.hotel.hotel_reviews &&
      //   dataOrderDetail[0].facility.hotel.hotel_reviews.length
      // ) {
      //   boor_border_hotel_rating_length =
      //     dataOrderDetail[0].facility.hotel.hotel_reviews.length;
      // } else {
      //   boor_border_hotel_rating_length = 0;
      // }

      const dataRes = {
        boor_id: dataOrderDetail[0].border_boor_id,
        boor_border_hotel_book_name:
          dataOrderDetail[0].facility.hotel.hotel_name,
        boor_boor_rooms_address1:
          dataOrderDetail[0].facility.hotel.address.addr_line1,
        boor_border_rooms_address_city:
          dataOrderDetail[0].facility.hotel.address.city.city_name,
        boor_border_hotel_rating:
          dataOrderDetail[0].facility.hotel.hotel_rating_star,
        // boor_border_hotel_rating_length: boor_border_hotel_rating_length,
        boor_border_hotel_rating_length:
          dataOrderDetail[0].facility.hotel.hotel_reviews,
        boor_border_hotel_rating_status: ratingStarStatus,
        boor_border_hotel_checkin_checkout: `${Checkin} ${Checkout}`,
        boor_border_hotel_rooms_total_rooms: TotalRooms,
        boor_border_hotel_rooms_total_guest: TotalGuest,
        boor_border_rooms_name: dataOrderDetail[0].facility.faci_name,
        boor_border_rooms_price: dataOrderDetail[0].borde_price,
        boor_border_rooms_percent_discount: `${
          100 * Number(dataOrderDetail[0].facility.faci_discount)
        }%`,
        boor_border_rooms_percent_tax: `${
          100 * Number(dataOrderDetail[0].facility.faci_tax_rate)
        }%`,
        boor_border_rooms_price_total: totalPrice,
        boor_border_rooms_sub_total: subTotal,
        boor_border_rooms_bonus_member: bonusMember,
      };
      return { dataRes, dataCache: dataOrderDetail };
    } catch (error) {
      return error;
    }
  }

  async getAllSpecialOffers(IdBoor: string) {
    try {
      const getAllUserSpecialOffers =
        await this.bookingOrderDetailsModel.findOne({
          include: [
            {
              model: booking_orders,
              include: [
                {
                  model: users,
                  include: [
                    {
                      model: user_members,
                    },
                  ],
                },
              ],
            },
          ],
          where: {
            border_boor_id: Number(IdBoor),
          },
        });

      const getAllSpecialOffers = await this.specialOffersModel.findOne({
        where: {
          spof_type: getAllUserSpecialOffers.booking_orders.users.user_type,
        },
      });
      return getAllSpecialOffers;
    } catch (error) {
      return error;
    }
  }

  async createTemporaryBooking(dataOrder: {
    booking_orders: {
      boor_hotel_id: number;
      boor_user_id: number;
      booking_order_detail: any[];
    };
  }) {
    try {
      const dataBookingOrders = await this.bookingOrdersModel.create({
        boor_hotel_id: dataOrder.booking_orders.boor_hotel_id,
        boor_user_id: dataOrder.booking_orders.boor_user_id,
      });
      const dataAll = dataOrder.booking_orders.booking_order_detail.map(
        (data: any) => {
          return {
            border_boor_id: dataBookingOrders.boor_id,
            ...data,
          };
        },
      );

      const dataBookingOrderDetail = await this.bookingOrderDetailsModel
        .bulkCreate(dataAll)
        .catch((err: any) => {
          console.log(err);
        });

      const dataAllBookingDetails = await this.bookingOrderDetailsModel
        .findAll({
          where: {
            border_boor_id: 20,
          },
          include: [
            {
              model: facilities,
              include: [
                {
                  model: hotels,
                  include: [
                    {
                      model: address,
                      include: [
                        {
                          model: city,
                          include: [
                            {
                              model: provinces,
                              include: [
                                {
                                  model: country,
                                  include: [
                                    {
                                      model: regions,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        })
        .catch((err: any) => {
          console.log(err);
        });

      return dataBookingOrderDetail;
    } catch (error) {
      return error;
    }
  }
}
