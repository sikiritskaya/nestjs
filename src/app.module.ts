import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { CommentsModule } from "./comments/comments.module";
import { PostModule } from "./post/post.module";
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [MongooseModule.forRoot(process.env.DB_URL), UserModule, PostModule, CommentsModule, AuthModule, MailModule],
    controllers: [],
    providers: []
})

export class AppModule { };