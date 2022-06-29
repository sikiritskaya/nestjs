import { Post } from "src/post/post.model";

export class CreateCommentDto {
    readonly author: string;
    readonly body: string;
    readonly postId: Post;
}