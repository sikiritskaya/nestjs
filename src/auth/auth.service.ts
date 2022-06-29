import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    logger: Logger
    constructor(private userService: UserService, private jwtService: JwtService, private mailService: MailService) { 
        this.logger = new Logger()
    }

    async signUp(userDto: CreateUserDto) {
        const existingUser = await this.userService.findByEmail(userDto.email);
        const existingUserByName = await this.userService.findByName(userDto.username);
        if (existingUser && existingUserByName) {
            throw new HttpException('such user exists', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const confirmationCode = uuidv4();
        try {
            const user = await this.userService.signUp({ ...userDto, password: hashPassword, confirmationCode });
            await this.mailService.sendActivationMail(userDto.email, userDto.username, confirmationCode).catch(e=>console.log(e));
            return user;
        }
        catch (e) {
            this.logger.error(e.message);
        }
    }

    activate(link: string): Promise<User> {
        return this.userService.activateAccount(link)
    }

    async signIn(userDto: CreateUserDto) {
        const user = await this.userService.findByName(userDto.username);
        const validPassword = await bcrypt.compare(userDto.password, user.password);
        if (!user || !validPassword) {
            throw new HttpException('The user or password is incorrect', HttpStatus.BAD_REQUEST);
        }
        if (!user.isActive) {
            throw new HttpException('Pending Account. Please verify your email.', HttpStatus.FORBIDDEN);
        }
        
        return this.generateJwt(user)
    }

    private async generateJwt(user: any) {
        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }
}
