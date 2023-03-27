import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { FacilityPhotosService } from './facility-photos.service';
import { CreateFacilityPhotoDto } from './dto/create-facility-photo.dto';
import { UpdateFacilityPhotoDto } from './dto/update-facility-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config/config.upload';

@Controller('facility-photos')
export class FacilityPhotosController {
  constructor(private readonly facilityPhotosService: FacilityPhotosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('fapho_photo_filename', multerOptions))
  create(
    @Body() createFacilityPhotoDto: CreateFacilityPhotoDto,
    @UploadedFile() fapho_photo_filename: Express.Multer.File,
  ) {
    createFacilityPhotoDto.fapho_photo_filename = fapho_photo_filename.filename;
    return this.facilityPhotosService.create(createFacilityPhotoDto);
  }

  @Get()
  findAll() {
    return this.facilityPhotosService.findAll();
  }

  @Get('/image/:name')
  async serveImage(@Param('name') filename: string, @Res() res: any) {
    return this.facilityPhotosService.getImage(filename, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityPhotosService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('fapho_photo_filename', multerOptions))
  update(
    @Param('id') id: string,
    @Body() updateFacilityPhotoDto: UpdateFacilityPhotoDto,
    @UploadedFile() fapho_photo_filename: Express.Multer.File,
  ) {
    if (fapho_photo_filename) {
      updateFacilityPhotoDto.fapho_photo_filename =
        fapho_photo_filename.filename;
    }
    return this.facilityPhotosService.update(+id, updateFacilityPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityPhotosService.remove(+id);
  }
}
