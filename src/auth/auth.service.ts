import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt'
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private mailService: MailService) {}

    async signUp( userDto: createUserDto){
        const existingUser = await this.userService.findByEmail(userDto.email);
        const existingUserByName = await this.userService.findByName(userDto.username);
        if (existingUser && existingUserByName) {
            throw new HttpException('such user exists', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const confirmationCode = uuidv4();
        try {
            const user = await this.userService.signUp({ ...userDto, password: hashPassword, confirmationCode });
            await this.mailService.sendActivationMail(userDto.email, userDto.username, confirmationCode);
            return user;
        }
        catch (e) {
            console.log(e.message);
        }
    }
  
    logout(userDto: createUserDto) {
            
    }
   
    activate(){

    }

    async signIn(userDto: createUserDto){
        const user = await this.userService.findByName(userDto.username);
        const validPassword = await bcrypt.compare(userDto.password, user.password);
        if (!user || !validPassword) {
            throw new Error('The user or password is incorrect');
        }
        if (!user.isActive) {
            throw new Error('Pending Account. Please verify your email.');
        }
        return this.generateJwt(user)
        
    }

    private async generateJwt(user: any){
        const payload = { username: user.username, sub: user._id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
