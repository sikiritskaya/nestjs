import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request as RequestType } from 'express';
import { jwtConstants } from "./constants";

const cookieExtractor = (req: RequestType): string | null => {
    return req && req.cookies ? req.cookies['token'] : null 
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
        return { username: payload.username }
    }
}