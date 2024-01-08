const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const Jimp = require("jimp");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: multerConfig
});

const processAvatar = async (inputPath, outputPath) => {
    const image = await Jimp.read(inputPath);
    await image.resize(250, 250).writeAsync(outputPath);
};

const uploadWithProcessing = (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const uniqueFilename = nanoid() + path.extname(originalname);
    const avatarTmpPath = path.join(tempDir, uniqueFilename);

    processAvatar(tempUpload, avatarTmpPath)
        .then(() => {
            req.processedAvatar = {
                tmpPath: tempUpload,
                filename: uniqueFilename,
                avatarTmpPath
            };
            next();
        })
        .catch((error) => {
            console.error("Error processing avatar:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

module.exports = { upload, uploadWithProcessing };
