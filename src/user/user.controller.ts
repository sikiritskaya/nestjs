import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { createUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/api')
export class UserController {
    constructor(private userService: UserService){}

    @Get('/user')
    getAllUsers(){
        return this.userService.getAllUsers()
    }
    @Post('/user')
    createUser(@Body() userDto: createUserDto) {
        return this.userService.signUp(userDto);    
    }


}
