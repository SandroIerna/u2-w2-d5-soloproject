import express from "express";
import listEndpoints from "express-list-endpoints";
import mediaRouter from "./api/media/index.js";
import { badRequest } from "./errorHandlers.js";
import cors from "cors";
import filesRouter from "./api/file/index.js";

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors());

// ******************* ENDPOINTS *********************

server.use("/media", mediaRouter);
server.use("/files", filesRouter);

// ***************** ERROR HANDLERS ******************

server.use(badRequest);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(port);
});
