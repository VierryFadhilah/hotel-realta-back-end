import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
// import { PaymentModule } from './payment/payment.module';
// import { HotelModule } from './hotel-schema/hotel.module';
// import { MasterModule } from './master-schema/master.module';
// import { HrModule } from './hr/hr.module';
import { UsersTModule } from './users/users.module';
import { AuthMiddleware } from './users/auth/auth.middleware';
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
    UsersTModule,
    // HotelModule,
    // HrModule,
    // RestoTModule,
    PurchasingModule,
    // UsersTModule,
    // MasterModule,
  ],
})
export class AppModule {}
