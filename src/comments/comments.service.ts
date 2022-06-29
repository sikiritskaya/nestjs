import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.model';
import { CreateCommentDto } from 'src/dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) { }

    getAll(): Promise<Comment[]> {
        return this.commentModel.find().exec();
    }

    async create(comment: CreateCommentDto): Promise<Comment> {
        const res = await this.commentModel.create(comment);

        return res.save();
    }

    async delete(id: string): Promise<any> {
        if (!id) {
            throw new HttpException('id is not provided', HttpStatus.BAD_REQUEST);
        }

        return this.commentModel.findByIdAndDelete(id);
    }

    async update(comment: CreateCommentDto, id: string): Promise<Comment> {
        return this.commentModel.findByIdAndUpdate(id, comment, { new: true });
    }
    
    async getCommentsById(id: string): Promise<Comment[]> {
        return this.commentModel.find({ postId: id }).populate('postId', 'title -_id');
    }

}
