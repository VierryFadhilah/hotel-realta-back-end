import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentModule } from './payment/payment.module';
import { HotelModule } from './hotel-schema/hotel.module';
import { HrModule } from './hr/hr.module';
import { RestoTModule } from './resto/resto-t.module';
import { PurchasingModule } from './purchasing/purchasing.module';
import { UsersTModule } from './users/users.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),

    PaymentModule,
    HotelModule,
    HrModule,
    RestoTModule,
    PurchasingModule,
    UsersTModule,
    BookingModule,
  ],
})
export class AppModule {}
