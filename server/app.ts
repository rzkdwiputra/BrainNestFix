require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.routes";
import orderRouter from "./routes/order.routes";
import notificationRoute from "./routes/notification.routes";
import analyticsRouter from "./routes/analytics.routes";
import layoutRouter from "./routes/layout.routes";

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cor => cross origin resource sharing
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

//routes
app.use("/api/v1", userRouter, orderRouter, courseRouter, notificationRoute, analyticsRouter, layoutRouter);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    massage: "API is working",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
