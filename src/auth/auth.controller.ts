import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { createUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/sign-up')
    signUp(@Body() userDto: createUserDto){
        return this.authService.signUp(userDto)
    }
    @Post('/sign-out')
    logout(@Body() userDto: createUserDto) {
            
    }
    @Get('/activate/:link')
    activate(){}

    @Post('/sign-in')
    signIn(@Res() res: Response, @Body() userDto:createUserDto){
        const access_token = this.authService.signIn(userDto)
        return res.cookie('token', access_token,
        { httpOnly: true, maxAge: /* process.env.TOKEN_EXPIRATEION_INTERVAL_HOURS */ 24 * 1000 * 60 * 60 })
    }

}
