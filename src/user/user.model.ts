import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: Boolean, default: false })
    isActive: boolean;

    @Prop()
    confirmationCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

