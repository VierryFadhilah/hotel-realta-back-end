import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFiles,
  Put,
  UseInterceptors,
  Query,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { StockPhotoService } from './stock_photo.service';
import { CreateStockPhotoDto } from './dto/create-stock_photo.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';

@Controller('purchasing/stock-photo')
export class StockPhotoController {
  constructor(private readonly stockPhotoService: StockPhotoService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('spho_url'))
  // async uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() createStockPhotoDto: CreateStockPhotoDto,
  // ) {
  //   const result = await this.stockPhotoService.create(
  //     file,
  //     createStockPhotoDto,
  //   );
  //   return { message: 'Upload file sukses', result };
  // }

  @Post()
  @UseInterceptors(FilesInterceptor('spho_url', 8))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createStockPhotoDto: CreateStockPhotoDto,
  ) {
    const result = await this.stockPhotoService.create(
      files,
      createStockPhotoDto,
    );
    return { message: 'Upload file sukses', result };
  }

  // @Post()
  // @UseInterceptors(FilesInterceptor('spho_url', 8))
  // async uploadFiles(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() createStockPhotoDto: CreateStockPhotoDto,
  // ) {
  //   const result = await this.stockPhotoService.create(
  //     files,
  //     createStockPhotoDto,
  //   );
  //   return { message: 'Upload file sukses', result };
  // }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 5) {
    return this.stockPhotoService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockPhotoService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('spho_url'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStockPhotoDto: CreateStockPhotoDto,
    @Param('id') id: number,
  ) {
    const result = await this.stockPhotoService.update(
      file,
      createStockPhotoDto,
      id,
    );
    return { message: 'Berhasil diperbaharui', result };
  }
  // @Put(':id')
  // @UseInterceptors(FilesInterceptor('spho_url', 8))
  // async updateMultiple(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() createStockPhotoDto: CreateStockPhotoDto,
  //   @Param('id') id: any,
  // ) {
  //   try {
  //     const result = await this.stockPhotoService.updateMultiple(
  //       files,
  //       createStockPhotoDto,
  //       id,
  //     );
  //     return { message: 'Berhasil mengupdate foto stock', data: result };
  //   } catch (err) {
  //     return { message: 'Terjadi kesalahan server' };
  //   }
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stockPhotoService.remove(+id);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.stockPhotoService.remove(+id);
    return { message: 'Stock photo has been removed' };
  }

  @Get('image/:spho_url')
  async getPhoto(@Param('spho_url') spho_url: string, @Res() res: Response) {
    const showImage = join(
      __dirname,
      '../../../../uploads/image/purchasing',
      spho_url,
    );
    res.sendFile(showImage);
  }
}
