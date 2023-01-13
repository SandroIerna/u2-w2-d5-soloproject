import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const publicFolderPath = join(process.cwd(), "./public/img/media");

const mediaJSONPath = join(dataFolderPath, "media.json");

export const getMedia = () => readJSON(mediaJSONPath);

export const writeMedia = (mediaArray) => writeJSON(mediaJSONPath, mediaArray);

export const saveMediaPicture = (fileName, contentAsABuffer) =>
  writeFile(join(publicFolderPath, fileName), contentAsABuffer);
