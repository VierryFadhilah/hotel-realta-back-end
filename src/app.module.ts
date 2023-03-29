import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelModule } from './hotel-schema/hotel.module';
import { HrModule } from './hr/hr.module';
import { RestoTModule } from './resto/resto-t.module';
import { PurchasingModule } from './purchasing/purchasing.module';

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
    HotelModule,
    HrModule,
    RestoTModule,
    PurchasingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
