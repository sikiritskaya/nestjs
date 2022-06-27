import { User } from "src/user/user.model";

export class createPostDto {
    readonly title: string;
    readonly body: string;
    readonly userId: User;
}