import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.HOST_MAIL,
                secure: false,
                auth: {
                    user: process.env.MY_EMAIL,
                    pass: process.env.MY_PASS,
                },
            },
            /* defaults: {
                from: '"No Reply" <noreply@example.com>',
            }, */
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule { };


