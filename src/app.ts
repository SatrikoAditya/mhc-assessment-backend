import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import ExpressMongoSanitize from "express-mongo-sanitize";
import path from "path";
import { morgan } from "./plugins/logger";
import dotenv from "dotenv";

import indexRouter from "./routers";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";

dotenv.config();

const app: Express = express();

if (process.env.NODE_ENV !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());

app.use("/", indexRouter);

app.use(errorHandlerMiddleware);

export default app;
