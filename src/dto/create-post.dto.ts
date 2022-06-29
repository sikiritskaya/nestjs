import { User } from "src/user/user.model";

export class CreatePostDto {
    readonly title: string;
    readonly body: string;
    readonly userId: User;
}