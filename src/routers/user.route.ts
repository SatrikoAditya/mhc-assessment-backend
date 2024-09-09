import express, { Router } from "express";
import validate from "@src/middlewares/validate.middleware";
import * as userValidation from "@src/validations/user.validation";
import * as userController from "@src/controllers/user.controller";
import passport from "@src/middlewares/user-auth.middleware";

const router: Router = express.Router();

router.post("/login", validate(userValidation.loginUser), userController.login);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/info", userController.getUserInfo);

export default router;
