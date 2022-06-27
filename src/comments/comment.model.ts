import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { Post } from "src/post/post.model";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {

    @Prop({type: String, required:true})
    author: string;

    @Prop({type: String, required:true})
    body: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
    postId: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
