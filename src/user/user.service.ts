import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async signUp(dto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(dto);

        return newUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().populate({ path: 'posts', select: 'title body' });
    }

    async update(dto: CreateUserDto, id: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, dto, { new: true })
    }

    async delete(id: string): Promise<any> {
        return this.userModel.findByIdAndDelete(id);
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email })
    }

    async findByName(username: string): Promise<User> {
        return this.userModel.findOne({ username })
    }

    async activateAccount(confirmationCode: string): Promise<User> {
        const user = await this.userModel.findOne({ confirmationCode });
        if (!user) {
            throw new HttpException('user did not exist', HttpStatus.BAD_REQUEST)
        }
        user.isActive = true;
        await user.save();

        return user;
    }
}
