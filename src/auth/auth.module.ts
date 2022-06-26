import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from 'src/mail/mail.module';
import { jwtConstants } from './constans';

@Module({
  imports: [UserModule,
    MailModule,
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: `${process.env.TOKEN_EXPIRATEION_INTERVAL_HOURS}h`
    }
  })
  ],
  providers: [AuthService, JwtStrategy],//, JwtStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}
