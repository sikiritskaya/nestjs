import { Post } from "src/post/post.model";

export class createCommentDto {
    readonly author: string;
    readonly body: string;
    readonly postId: Post;
}