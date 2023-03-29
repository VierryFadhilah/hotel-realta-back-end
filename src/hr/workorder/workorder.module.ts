import { Module } from '@nestjs/common';
import { WorkorderService } from './workorder.service';
import { WorkorderController } from './workorder.controller';

@Module({
  controllers: [WorkorderController],
  providers: [WorkorderService],
})
export class WorkorderModule {}
