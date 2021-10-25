import { diskStorage } from 'multer';
import * as path from 'path';
import { InvalidFileType } from 'src/customErrors/validations';
export const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'public', 'pizzas'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const fileFilter = (_, file: FileFromMulter, cb) => {
  file.mimetype.includes('image')
    ? cb(null, true)
    : cb(new InvalidFileType(), false);
};
export const limits = { fileSize: 20971520 };

type FileFromMulter = {
  // TODO refactor to types
  /** Field name specified in the form */
  fieldname: string;
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination: string;
  /** The name of the file within the destination (DiskStorage) */
  filename: string;
  /** Location of the uploaded file (DiskStorage) */
  path: string;
  /** A Buffer of the entire file (MemoryStorage) */
  buffer: Buffer;
};
