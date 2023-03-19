import { Injectable } from '@nestjs/common';
import { CreateHotelReviewDto } from './dto/create-hotel-review.dto';
import { UpdateHotelReviewDto } from './dto/update-hotel-review.dto';

@Injectable()
export class HotelReviewsService {
  create(createHotelReviewDto: CreateHotelReviewDto) {
    return 'This action adds a new hotelReview';
  }

  findAll() {
    return `This action returns all hotelReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelReview`;
  }

  update(id: number, updateHotelReviewDto: UpdateHotelReviewDto) {
    return `This action updates a #${id} hotelReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelReview`;
  }
}
