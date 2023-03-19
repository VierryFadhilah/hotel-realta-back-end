import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacilityPhotosService } from './facility-photos.service';
import { CreateFacilityPhotoDto } from './dto/create-facility-photo.dto';
import { UpdateFacilityPhotoDto } from './dto/update-facility-photo.dto';

@Controller('facility-photos')
export class FacilityPhotosController {
  constructor(private readonly facilityPhotosService: FacilityPhotosService) {}

  @Post()
  create(@Body() createFacilityPhotoDto: CreateFacilityPhotoDto) {
    return this.facilityPhotosService.create(createFacilityPhotoDto);
  }

  @Get()
  findAll() {
    return this.facilityPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacilityPhotoDto: UpdateFacilityPhotoDto) {
    return this.facilityPhotosService.update(+id, updateFacilityPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityPhotosService.remove(+id);
  }
}
