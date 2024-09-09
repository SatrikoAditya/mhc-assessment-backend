import express, { Router } from "express";
import validate from "@src/middlewares/validate.middleware";
import * as vendorController from "@src/controllers/vendor.controller";

const router: Router = express.Router();

router.get("/", vendorController.getVendors);

export default router;
