import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule,
    PassportModule,
    JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: `${process.env.TOKEN_EXPIRATEION_INTERVAL_HOURS}h`
    }
  })
  ],
  providers: [AuthService], //JwtStrategy
  controllers: [AuthController],
})
export class AuthModule {}
