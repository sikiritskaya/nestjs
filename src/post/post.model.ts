import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { User } from "src/user/user.model";

export type PostDocument = Post & Document;

@Schema()
export class Post {

    @Prop({type: String, required:true})
    title: string;

    @Prop({type: String, required:true})
    body: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    userId: User;
}


export const PostSchema = SchemaFactory.createForClass(Post);

