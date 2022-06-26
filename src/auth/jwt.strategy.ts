import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request as RequestType } from 'express';

const cookieExtractor = (req: RequestType): string | null => {
    let jwt = null; 

    if (req && req.cookies) {
        jwt = req.cookies['token'];
    }

    return jwt;
};

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY
        })
    }

    async validate(payload: any) {
        return {username: payload.username}
    }
}