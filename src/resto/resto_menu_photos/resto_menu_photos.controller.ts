import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Param,
  Delete,
  UploadedFiles,
  UploadedFile,
  Put,
  Res,
} from '@nestjs/common';
import { RestoMenuPhotosService } from './resto_menu_photos.service';
import { CreateRestoMenuPhotoDto } from './dto/create-resto_menu_photo.dto';
import { UpdateRestoMenuPhotoDto } from './dto/update-resto_menu_photo.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { join } from 'path';

@Controller('resto-menu-photos')
export class RestoMenuPhotosController {
  constructor(
    private readonly restoMenuPhotosService: RestoMenuPhotosService,
  ) {}

  // untuk mengupload 1 file foto
  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('remp_photo_filename', {
  //     storage: diskStorage({
  //       destination: './uploads/image/resto',
  //       filename: function (req, file, cb) {
  //         const uniqueSuffix = Math.round(Math.random() * 1e9);
  //         const fileName = `${uniqueSuffix}-${file.originalname}`;
  //         cb(null, fileName);
  //       },
  //     }),
  //   }),
  // )
  // async create(
  //   @UploadedFile() remp_photo_filename: Express.Multer.File,
  //   @Body() createRestoMenuPhotoDto: CreateRestoMenuPhotoDto,
  // ) {
  //   try {
  //     const photoMenu = await this.restoMenuPhotosService.create(
  //       createRestoMenuPhotoDto,
  //       remp_photo_filename,
  //     );
  //     return photoMenu;
  //   } catch (error) {
  //     return error;
  //   }
  // }
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('remp_photo_filename', 6, {
      storage: diskStorage({
        destination: './uploads/image/resto',
        filename: function (req, file, cb) {
          const uniqueSuffix = Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() remp_photo_filename: Express.Multer.File[],
    @Body() createRestoMenuPhotoDto: CreateRestoMenuPhotoDto,
  ) {
    try {
      const photoMenu = await this.restoMenuPhotosService.create(
        createRestoMenuPhotoDto,
        remp_photo_filename,
      );
      return photoMenu;
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll(): Promise<any[]> {
    return this.restoMenuPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.restoMenuPhotosService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('remp_photo_filename', {
      storage: diskStorage({
        destination: './uploads/image/resto',
        filename: function (req, file, cb) {
          const uniqueSuffix = Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async update(
    @UploadedFile() remp_photo_filename: Express.Multer.File,
    @Body() updateRestoMenuPhotoDto: UpdateRestoMenuPhotoDto,
    @Param('id') id: number,
  ) {
    const menuphotos = await this.restoMenuPhotosService.update(
      id,
      updateRestoMenuPhotoDto,
      remp_photo_filename,
    );
    return menuphotos;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restoMenuPhotosService.remove(+id);
  }

  @Get('uploads/image/resto/:remp_photo_filename')
  async getProductImage(
    @Param('remp_photo_filename') remp_photo_filename: string,
    @Res() res: Response,
  ) {
    const showImage = join(
      __dirname,
      '../../../../uploads/image/resto/',
      remp_photo_filename,
    );
    console.log('tes=>', showImage);

    res.sendFile(showImage);
  }
}
