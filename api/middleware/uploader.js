const multer = require("multer");
const crypto = require("crypto");
const config = require("../config");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
    if (err) {
        return cb(err);
      } else {
        cb(null, raw.toString("hex") + "." + file.mimetype.split("/")[1]);
      }
    });
  },
});

const fileFilter = (req, file, cb) => {
  if (config.fileTypesToLoad.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 20,
};

module.exports = multer({ storage, fileFilter, limits });