import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/api')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/user')
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Post('/user')
    createUser(@Body() userDto: createUserDto) {
        return this.userService.signUp(userDto);
    }

    @Delete('/user/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id)
    }

    @Put('/user/:id')
    updateUser(@Body() dto: createUserDto, @Param('id') id: string) {
        return this.userService.update(dto, id)
    }

}
