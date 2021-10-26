import { diskStorage } from 'multer';
import * as path from 'path';
import { InvalidFileType } from './errors/InvalidFileType';
export const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'public', 'pizzas'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const fileFilter = (_, file: Express.Multer.File, cb) => {
  file.mimetype.includes('image')
    ? cb(null, true)
    : cb(new InvalidFileType(), false);
};
export const limits = { fileSize: 20971520 };
