import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { AppModule } from './app.module';

const PORT = 3333

const startApp = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(passport.initialize());
    app.listen(PORT, () => console.log(`server startred on ${PORT}`));
  }
  catch (e) {
    console.log(e.message);
  }
};

startApp();
