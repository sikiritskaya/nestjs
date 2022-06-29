import { NestjsWinstonLoggerService } from "nestjs-winston-logger";
import { format, transports } from "winston";

export const globalLogger = new NestjsWinstonLoggerService({
    format: format.combine(
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.align(),
        format.json(),
        format.colorize({all: true})),
    transports: [new transports.Console()]
})