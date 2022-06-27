export class createUserDto {
    readonly username: string;
    readonly password: string;
    readonly email?: string;
    readonly confirmationCode?: string;
}