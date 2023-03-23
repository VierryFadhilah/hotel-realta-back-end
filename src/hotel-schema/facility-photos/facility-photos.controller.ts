import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FacilityPhotosService } from './facility-photos.service';
import { CreateFacilityPhotoDto } from './dto/create-facility-photo.dto';
import { UpdateFacilityPhotoDto } from './dto/update-facility-photo.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config/config.upload';

@Controller('facility-photos')
export class FacilityPhotosController {
  constructor(private readonly facilityPhotosService: FacilityPhotosService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'sampul', maxCount: 1 },
        { name: 'fapho_photo_filename', maxCount: 10 },
      ],
      multerOptions,
    ),
  )
  create(
    @Body() createFacilityPhotoDto: CreateFacilityPhotoDto,
    @UploadedFiles()
    files: {
      sampul?: Express.Multer.File;
      fapho_photo_filename?: Express.Multer.File[];
    },
  ) {
    const sampul = files.sampul ? files.sampul[0] : null;
    const image = files.fapho_photo_filename
      ? files.fapho_photo_filename
      : null;
    console.log(sampul);
    console.log(image);

    image.map((photo) => {
      createFacilityPhotoDto.fapho_photo_filename = photo.filename;

      return this.facilityPhotosService.create(createFacilityPhotoDto);
    });
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
  update(
    @Param('id') id: string,
    @Body() updateFacilityPhotoDto: UpdateFacilityPhotoDto,
  ) {
    return this.facilityPhotosService.update(+id, updateFacilityPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityPhotosService.remove(+id);
  }
}
