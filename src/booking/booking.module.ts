// import { Module } from '@nestjs/common';
// import { BookhotelsModule } from './bookhotels/bookhotels.module';
// import { SequelizeModule } from '@nestjs/sequelize';
// import {
//   facilities,
//   facilities_support,
//   hotels,
//   facility_support_hotels,
//   hotel_reviews,
//   facility_photos,
//   facility_price_history,
// } from 'models/booking/hotelSchema';
// import {
//   address,
//   category_group,
//   city,
//   country,
//   members,
//   policy,
//   policy_category_group,
//   provinces,
//   regions,
// } from 'models/booking/masterSchema';
// import { user_members, users } from 'models/booking/usersSchema';
// import {
//   booking_orders,
//   booking_order_details,
//   booking_order_detail_extra,
// } from 'models/booking/bookingSchema';

// @Module({
//   imports: [
//     BookhotelsModule,
//     SequelizeModule.forFeature([
//       hotels,
//       address,
//       facilities,
//       facilities_support,
//       facility_support_hotels,
//       category_group,
//       members,
//       hotel_reviews,
//       users,
//       city,
//       facility_photos,
//       facility_price_history,
//       booking_orders,
//       booking_order_details,
//       booking_order_detail_extra,
//       policy_category_group,
//       policy,
//       user_members,
//       provinces,
//       country,
//       regions,
//     ]),
//   ],
// })
// export class BookingModule {}
