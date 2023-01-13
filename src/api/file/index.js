import express from "express";
import multer from "multer";
import { getMedia, saveMediaPicture, writeMedia } from "../../lib/fs-tools.js";
import {
  getPDFReadableStream,
  getPDFReadableStreamSingle,
} from "../../lib/pdf-tools.js";
import { pipeline } from "stream";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const filesRouter = express.Router();

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: { folder: "medias/files" },
  }),
}).single("poster");

/* ------------------------------ POST ------------------------------ */

filesRouter.post("/:mediaId", cloudinaryUploader, async (req, res, next) => {
  try {
    const url = req.file.path;
    const mediaArray = await getMedia();
    const index = mediaArray.findIndex(
      (media) => media._id === req.params.mediaId
    );
    if (index !== 1) {
      const newMedia = { ...mediaArray[index], poster: url };
      mediaArray[index] = newMedia;
      await writeMedia(mediaArray);
    }

    res.send({ Message: "File Added" });
    /*       const fileName = req.file.originalname;
      await saveMediaPicture(fileName, req.file.buffer);
      const url = "http://localhost:3001/img/media/" + fileName;
      const mediaArray = await getMedia();
      const index = mediaArray.findIndex(
        (media) => media._id === req.params.mediaId
      );
      const oldMedia = mediaArray[index];
      const mediaWithImage = { ...oldMedia, poster: url };
      mediaArray[index] = mediaWithImage;
      await writeMedia(mediaArray);

      res.send("uploaded"); */
  } catch (error) {
    next(error);
  }
});

/* --------------------------- GET SINGLE --------------------------- */

filesRouter.get("/pdf/:mediaId", async (req, res, next) => {
  res.setHeader("Content-Disposition", "attachment; filename=test.pdf");

  const mediaArray = await getMedia();
  const mediaId = req.params.mediaId;
  const media = mediaArray.find((media) => media._id === mediaId);
  const source = getPDFReadableStreamSingle(media);
  const destination = res;
  pipeline(source, destination, (err) => {
    if (err) console.log(err);
  });
});

/* -------------------------- GET MULTIPLE -------------------------- */

filesRouter.get("/pdf", async (rec, res, next) => {
  res.setHeader("Content-Disposition", "attachment; filename=test.pdf");

  const mediaArray = await getMedia();
  const source = getPDFReadableStream(mediaArray);
  const destination = res;
  pipeline(source, destination, (err) => {
    if (err) console.log(err);
  });
});

export default filesRouter;
