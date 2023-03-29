import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHotelReviewDto } from './dto/create-hotel-review.dto';
import { UpdateHotelReviewDto } from './dto/update-hotel-review.dto';
import { hotel_reviews } from 'models/hotel_module';

@Injectable()
export class HotelReviewsService {
  async create(createHotelReviewDto: CreateHotelReviewDto) {
    try {
      const result = await hotel_reviews.create(createHotelReviewDto);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const result = await hotel_reviews.findAll();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(hore_id: number) {
    try {
      const result = await hotel_reviews.findOne({
        where: { hore_id },
      });
      if (!result) {
        throw new HttpException(
          'review tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      return result;
    } catch (error) {
      if (error.status == 400) {
        throw new HttpException(
          'review tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateHotelReviewDto: UpdateHotelReviewDto) {
    try {
      const result = await this.findOne(id);
      result.update(updateHotelReviewDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.findOne(id);

      result.destroy();
      return `This action removes a #${id} hotelReview`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
