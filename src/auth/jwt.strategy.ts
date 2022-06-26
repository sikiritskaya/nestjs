import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request as RequestType } from 'express';
import { jwtConstants } from "./constans";

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
            secretOrKey: jwtConstants.secret,
            
        })
    }

    async validate(payload: any) {
        return {username: payload.username}
    }
}