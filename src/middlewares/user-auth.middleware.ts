import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import passportJWT, { StrategyOptionsWithoutRequest } from "passport-jwt";
import { getUserById } from "@src/services/user.service";

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || "",
};

const strategy = new JWTStrategy(opts, async (payload, next) => {
  const findUser = await getUserById(payload.currentUser.id);
  if (findUser) {
    next(null, findUser);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

export default passport;
