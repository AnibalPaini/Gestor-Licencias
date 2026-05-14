import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default {
  port: process.env.PORT,
  mongoUri: process.env.MongoUri,
  secretJWT: process.env.JWT_SECRET,
  secretCookie: process.env.COOKIE_SECRET,
};
