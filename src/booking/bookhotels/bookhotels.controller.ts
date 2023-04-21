import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { BookhotelsService } from './bookhotels.service';
import { Response } from 'express';

@Controller('bookhotels')
export class BookhotelsController {
  constructor(private readonly bookhotelsService: BookhotelsService) {}

  @Get()
  async findHotels(
    @Query('page') page = 1,
    @Query('limit') limit = 2,
    @Query('minSubTotal') minSubTotal = 0,
    @Query('maxSubTotal') maxSubTotal = Number.MAX_VALUE,
    @Query('cityName') cityName: string,
    @Query('provName') provName: string,
    @Query('countryName') countryName: string,
    @Query('regionName') regionName: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('facilities_support_filter')
    facilities_support_filter: string,
    @Res() res: Response,
  ) {
    try {
      let facilitiesSupportFilter: any;
      if (facilities_support_filter !== undefined) {
        facilitiesSupportFilter = facilities_support_filter
          .split(', ')
          .map((str) => str.replace(/[\[\]']+/g, ''));
      }
      const result = await this.bookhotelsService.findHotels(
        page,
        limit,
        cityName,
        provName,
        countryName,
        regionName,
        facilitiesSupportFilter,
      );

      const data = result.data;
      const totalData = result.totalData;

      let dataResFinal = data.map((data: any) => {
        let priceRate = 0;
        if (data.faci_rate_price.length > 0) {
          priceRate = parseInt(data.faci_rate_price.replace(/[^0-9.-]+/g, ''));
        }

        const priceAfterDiscount =
          (data.faci_rate_price * data.faci_discount) / 100;
        const subTotal = data.faci_rate_price - priceAfterDiscount;

        const dataObj = {
          ...data,
          faci_subtotal: subTotal,
        };
        delete dataObj.parent;

        return dataObj;
      });
      let formattedDateStart: string;
      let formattedDateEnd: string;
      if (startDate && endDate) {
        dataResFinal = dataResFinal.filter((e: any) => {
          const faciStartDate = new Date(e.faci_startdate);
          const faciLastDate = new Date(e.faci_enddate);
          formattedDateStart = faciStartDate.toISOString().substring(0, 10);
          formattedDateEnd = faciLastDate.toISOString().substring(0, 10);
          return formattedDateStart >= startDate && formattedDateEnd <= endDate;
        });
      }

      if (!dataResFinal) {
        const dataResponse = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'gagal',
          data: dataResFinal,
        };
        return res.status(HttpStatus.BAD_REQUEST).send(dataResponse);
      } else {
        const dataResponse = {
          statusCode: HttpStatus.OK,
          message: 'success',
          data: dataResFinal,
          checkin: formattedDateStart,
          checkout: formattedDateEnd,
          page,
          limit,
          total: totalData,
        };
        return res
          .status(HttpStatus.OK)
          .send({ totalData: totalData, dataResponse });
      }
    } catch (err) {
      return res.status(HttpStatus.OK).send({ message: err });
    }
  }

  @Get('uploads/:ImgId')
  async findFaciPhoto(@Param('ImgId') path: string, @Res() res: any) {
    res.set('Content-Type', 'image/png');
    return res.sendFile(path, { root: 'public/uploads/image/hotel' });
  }

  @Get('hotel/:IdHotel/room/:IdFaci')
  async detailBookingRoom(
    @Param('IdFaci') IdFaci: string,
    @Param('IdHotel') IdHotel: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('dataRooms') dataRooms: string,
    @Query('guestRooms') guestRooms: string,
    @Res() res: Response,
  ) {
    let dataIdFilter: any;
    let dataGuestRooms: any;
    if (dataRooms !== undefined && guestRooms !== undefined) {
      dataIdFilter = dataRooms
        .split(', ')
        .map((str) => Number(str.replace(/[\[\]']+/g, '')));
      dataGuestRooms = guestRooms
        .split(', ')
        .map((str) => Number(str.replace(/[\[\]']+/g, '')));
    } else {
      dataIdFilter = [Number(IdFaci)];
      dataGuestRooms = [2];
    }
    try {
      const data = await this.bookhotelsService.findFaciById(
        IdHotel,
        dataIdFilter,
        startDate,
        endDate,
      );

      // console.log('data', data);

      let jumlahTotalPrice = 0;
      let priceRateReal = 0;
      data.forEach((item: any) => {
        let priceRate = 0;
        priceRate = parseFloat(
          item.faci_subtotal.replace(/[^\d\,]+/g, '').replace(',', '.'),
        );
        const priceRateRealConverse = parseFloat(
          item.faci_rate_price.replace(/[^\d\,]+/g, '').replace(',', '.'),
        );
        jumlahTotalPrice = jumlahTotalPrice + priceRate;
        priceRateReal = priceRateReal + priceRateRealConverse;
        console.log('priceRate', priceRate);
      });

      const jumlahTotalPriceRP = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(jumlahTotalPrice);

      const RpJumlahTotalPriceRateReal = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(priceRateReal);

      let dataGuestAll = 0;

      data.forEach((itemHotel: any, index: number) => {
        if (dataGuestRooms[index] > itemHotel.faci_max_number) {
          throw `Ruangan bernomor ${itemHotel.faci_room_number} bertipe ${itemHotel.faci_name} tidak digunakan lebih dari ${itemHotel.faci_max_number} orang`;
        } else {
          dataGuestAll += dataGuestRooms[index];
        }
      });
      return res.status(HttpStatus.OK).json({
        data: {
          data_rooms: data,
          total_price: jumlahTotalPriceRP,
          total_price_real: RpJumlahTotalPriceRateReal,
          totalGuest: dataGuestAll,
          totalRoomsBook: dataIdFilter.length,
        },
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({ message: err });
    }
  }

  // ? Data Kosong
  @Get('hotel/:IdHotel/room/:IdRoom/:SeriesRoom')
  async getAllListSameRoom(
    @Param('IdHotel') IdHotel: string,
    @Param('IdRoom') IdRoom: string,
    @Param('SeriesRoom') SeriesRoom: string,
    @Res() res: Response,
  ) {
    try {
      const dataListRoom = await this.bookhotelsService.getAllListSameRoom(
        Number(IdHotel),
        Number(IdRoom),
        SeriesRoom,
      );
      return res.status(HttpStatus.OK).send({
        message: 'Success',
        data: dataListRoom,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Failed',
        data: error,
      });
    }
  }

  // ? Bagaimana cara menggunakannya
  @Get('hotel/:IdHotel/room/')
  async getListRooms(
    @Param('IdHotel') IdHotel: string,
    @Query('NotRoomName') NotRoomName: string,
    @Query('IdCagro') IdCagro: string,
    @Res() res: Response,
  ) {
    try {
      const result =
        await this.bookhotelsService.findAllRoomsByCategoryAndHotel(
          IdHotel,
          NotRoomName,
          IdCagro,
        );

      return res.status(200).send(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).send({
        code: HttpStatus.BAD_GATEWAY,
        data: error,
        message: 'failed',
      });
    }
  }

  // ? Data Kosong
  @Get('hotel/room/order_booking_final/:IdOrderDetail/:IdUser')
  async getFinalBookingRooms(
    @Param('IdOrderDetail') IdOrderDetail: string,
    @Param('IdUser') IdUser: string,
    @Query('Checkin') Checkin: string,
    @Query('Checkout') Checkout: string,
    @Query('TotalGuest') TotalGuest: string,
    @Query('TotalRoom') TotalRoom: string,
    @Res() res: Response,
  ) {
    try {
      const { dataRes, dataCache } =
        await this.bookhotelsService.getFinalBookingRooms(
          Number(IdOrderDetail),
          Number(IdUser),
          Checkin,
          Checkout,
          Number(TotalGuest),
          Number(TotalRoom),
        );

      console.log(dataRes);

      return res.status(HttpStatus.OK).send({
        message: 'Success',
        data: dataRes,
        dataProccess: dataCache,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Failed',
        data: error,
      });
    }
  }

  @Get('hotel/room/coupon/:IdBoor')
  async getAllSpecialOffers(
    @Param('IdBoor') IdBoor: string,
    @Res() res: Response,
  ) {
    try {
      const getAllSpecialOffers =
        await this.bookhotelsService.getAllSpecialOffers(IdBoor);

      return res.status(HttpStatus.OK).send({
        message: 'Success',
        data: getAllSpecialOffers,
      });
    } catch (error) {
      return res.status(HttpStatus.OK).send({
        message: error,
      });
    }
  }

  @Post('hotel/room/order_booking')
  async temporaryBooking(@Body() dataOrder: any, @Res() res: Response) {
    try {
      const result = await this.bookhotelsService.createTemporaryBooking(
        dataOrder,
      );
      return res.status(HttpStatus.OK).send({
        message: 'Success',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Failed',
        data: error,
      });
    }
  }
}
