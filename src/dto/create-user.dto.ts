export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly email?: string;
    readonly confirmationCode?: string;
    readonly salt?: string;
}