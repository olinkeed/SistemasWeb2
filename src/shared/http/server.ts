import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3333, () => {
      console.log("Server started on port 3333!");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
