import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid';

export const multerConfig = {
  dest: process.env.UPLOAD_PATH,
};

function uuidRandom(file) {
  const result = `${uuid.v4()}${extname(file.originalname)}`;
  return result;
}

export const multerOptions = {
  filefilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true); //allow storage of file
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  //   storage
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },

    filename: (req: any, file: any, cb: any) => {
      cb(null, uuidRandom(file));
    },
  }),
};
