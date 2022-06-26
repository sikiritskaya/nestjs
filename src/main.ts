import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser';
import * as passport from "passport"

const PORT = process.env.Port || 8000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017';

const startApp = async () => {
  try {
      const app = await NestFactory.create(AppModule);
      app.use(cookieParser());
      app.use(passport.initialize());
      app.listen(PORT, () => console.log(`server startred on ${PORT}`));
  }
  catch (e) {
      //logger.error(e.message);
  }
};

startApp();
