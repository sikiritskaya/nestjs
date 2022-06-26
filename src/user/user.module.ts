import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
//import mailService from 'src/auth/mail.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name , schema: UserSchema }])],
    controllers:[ UserController],
    providers:[ UserService],
    exports:[UserService]
})
export class UserModule {}