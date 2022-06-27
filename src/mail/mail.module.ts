import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

const MY_PASS = process.env.MY_PASS || 'Djkjlz1986'
const MY_EMAIL = process.env.MY_EMAIL || 'sikiritskaya@gmail.com'
const HOST_MAIL = process.env.HOST_MAIL || 'smtp.gmail.com'
//const PORT_MAIL = process.env.PORT_MAIL || 587

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: HOST_MAIL,
                port: 587,//process.env.PORT_MAIL,
                secure: false,
                auth: {
                    user: MY_EMAIL,
                    pass: MY_PASS,
                },
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>',
            },
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


