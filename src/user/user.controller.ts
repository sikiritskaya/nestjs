import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/api')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/user')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Delete('/user/:id')
    deleteUser(@Res() response: Response, @Param('id') id: string) {
        const deletedUser = this.userService.delete(id);
        return response.status(HttpStatus.OK).json({ deletedUser })
    }

    @Put('/user/:id')
    updateUser(@Res() response: Response, @Body() dto: createUserDto, @Param('id') id: string) {
        const updatedUser = this.userService.update(dto, id);
        return response.status(HttpStatus.OK).json({ updatedUser })
    }

}
