import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { createUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async signUp(dto: createUserDto): Promise<User> {
        const newUser = new this.userModel(dto);
        return newUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find();
    }

    async update(user: UserDocument): Promise<User> {   //user?
        return await this.userModel.findByIdAndUpdate(user._id, user, { new: true })
    }

    async delete(id:{}): Promise<any> {
        return await this.userModel.findByIdAndDelete(id);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({email})
    }
     
    async findByName(username: string): Promise<User> {
        return await this.userModel.findOne({username})
    }

    async activateAccount(link: string): Promise<User>{
        const user = await this.userModel.findOne({ link });
        if (!user) {
            throw new HttpException('user did not exist', HttpStatus.BAD_REQUEST)
        }
        user.isActive = true;
        await user.save();
        return user;
    }
}
