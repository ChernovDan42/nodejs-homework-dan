const multer = require("multer");
const jimp = require("jimp");
const path = require("path");
const uuid = require("uuid").v4;
const fse = require("fs-extra");
const fs = require("fs").promises;

const { HttpError } = require("../utils");

/**
 * Image upload service class
 */
class ImageService {
  static initUploadImageMiddleware(name) {
    const multerStorage = multer.diskStorage({
      destination: (req, file, cbk) => {
        cbk(null, "tmp");
      },
      filename: (req, file, cbk) => {
        const extension = file.mimetype.split("/")[1];
        cbk(null, `${req.user.id}-${uuid()}.${extension}`);
      },
    });

    const multerFilter = (req, file, cbk) => {
      if (file.mimetype.startsWith("image/")) {
        cbk(null, true);
      } else {
        cbk(new HttpError(400, "Please, upload images only!!"), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async saveImage(file, options, ...pathSegments) {
    if (
      file.size >
      (options?.maxFileSize
        ? options.maxFileSize * 1024 * 1024
        : 1 * 1024 * 1024)
    ) {
      throw new HttpError(400, "File is too large!");
    }

    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir(fullFilePath);
    const avatar = await jimp.read(file.path);
    await avatar
      .cover(options.width || 250, options.height || 250)
      .quality(90)
      .writeAsync(path.join(fullFilePath, file.filename));

    fs.unlink(file.path);

    return path.join("/", ...pathSegments, file.filename);
  }
}

module.exports = ImageService;
