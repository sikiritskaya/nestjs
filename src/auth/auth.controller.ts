import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/sign-up')
    async signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto);
    }

    @Post('/sign-out')
    logout(@Res() res: Response) {
        res.clearCookie('token')
        return res.send('Exit')
    }

    @Get('/activate/:link')
    activate(@Param('link') link: string) {
        return this.authService.activate(link)
    }

    @Post('/sign-in')
    async signIn(@Body() userDto: CreateUserDto, @Res() res: Response) {
        const token = await this.authService.signIn(userDto);

        res.cookie('token', token.access_token,
            { httpOnly: true, maxAge: +process.env.TOKEN_EXPIRATEION_INTERVAL_HOURS * 1000 * 60 * 60 })

        return res.send(token.user)
    }

}
