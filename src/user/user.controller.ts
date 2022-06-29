import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from 'src/dto/create-user.dto';
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
    async deleteUser(@Res() response: Response, @Param('id') id: string) {
        const deletedUser = await this.userService.delete(id);
        return response.status(HttpStatus.OK).json({ deletedUser })
    }

    @Put('/user/:id')
    async updateUser(@Res() response: Response, @Body() dto: CreateUserDto, @Param('id') id: string) {
        const updatedUser = await this.userService.update(dto, id);
        return response.status(HttpStatus.OK).json({ updatedUser })
    }

}
