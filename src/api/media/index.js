import express from "express";
import uniqid from "uniqid";
import { getMedia, writeMedia } from "../../lib/fs-tools.js";
import { checkMediaSchema, detectBadRequest } from "./validator.js";

const mediaRouter = express.Router();

/* --------------------------- GET SINGLE --------------------------- */

mediaRouter.get("/:mediaID", async (req, res, next) => {
  try {
    const mediaArray = await getMedia();
    const mediaId = req.params.mediaID;
    const media = mediaArray.find((media) => media._id === mediaId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

/* -------------------------- GET MULTIPLE -------------------------- */

mediaRouter.get("/", async (req, res, next) => {
  try {
    const mediaArray = await getMedia();
    if (req.query && req.query.category) {
      const filteredMedia = mediaArray.filter(
        (media) => media.category === req.query.category
      );

      res.send(filteredMedia);
    } else {
      res.send(mediaArray);
    }
  } catch (error) {
    next.error;
  }
});

/* ------------------------------ POST ------------------------------ */

mediaRouter.post(
  "/",
  checkMediaSchema,
  detectBadRequest,
  async (req, res, next) => {
    try {
      const newMedia = { ...req.body, _id: uniqid() };
      const mediaArray = await getMedia();
      mediaArray.push(newMedia);
      writeMedia(mediaArray);
      res.status(201).send({ _id: newMedia._id });
    } catch (error) {
      next(error);
    }
  }
);

/* ------------------------------ PUT ------------------------------- */

mediaRouter.put("/:mediaId", async (req, res, next) => {
  try {
    const mediaArray = await getMedia();
    const mediaId = req.params.mediaId;
    const index = mediaArray.findIndex((media) => media._id === mediaId);
    const oldMedia = mediaArray[index];
    const updatedMedia = { ...oldMedia, ...req.body };
    mediaArray[index] = updatedMedia;
    writeMedia(mediaArray);
    res.send(updatedMedia);
  } catch (error) {
    next(error);
  }
});

/* ----------------------------- DELETE ----------------------------- */

mediaRouter.delete("/:mediaId", async (req, res, next) => {
  try {
    const mediaArray = await getMedia();
    const mediaId = req.params.mediaId;
    const remainingMedia = mediaArray.filter((media) => media._id !== mediaId);
    writeMedia(remainingMedia);
    res.send({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
