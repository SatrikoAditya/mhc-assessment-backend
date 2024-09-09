import express, { Router } from "express";
import validate from "@src/middlewares/validate.middleware";
import * as wellnessEventValidation from "@src/validations/wellness-event.validation";
import * as wellnessEventController from "@src/controllers/wellness-event.controller";

const router: Router = express.Router();

router.get("/", wellnessEventController.getWellnessEvents);

router.post(
  "/",
  validate(wellnessEventValidation.createWellnessEvent),
  wellnessEventController.createWellnessEvent
);

router.put(
  "/approval/:id",
  validate(wellnessEventValidation.approvalWellnessEvent),
  wellnessEventController.changeStatusWellnessEvent
);

export default router;
