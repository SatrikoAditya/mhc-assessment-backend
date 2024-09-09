import express, { Router, Request, Response } from "express";
import userRouter from "./user.route";
import vendorRouter from "./vendor.route";
import wellnessEventRouter from "./wellness-event.route";
import passport from "@src/middlewares/user-auth.middleware";

const router: Router = express.Router();

router.use("/user", userRouter);

router.use(passport.authenticate("jwt", { session: false }));

router.use("/vendor", vendorRouter);
router.use("/wellness-event", wellnessEventRouter);

export default router;
