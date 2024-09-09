import "module-alias/register";
import app from "./app";
import { logger } from "./plugins/logger";
import connectDB from "./config/db";

let server: any;

connectDB()
  .then(() => {
    server = app.listen(process.env.PORT, () => {
      logger.info(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Error starting server", error);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
