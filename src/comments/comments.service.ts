import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.model';
import { createCommentDto } from 'src/dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

    async getAll(): Promise<Comment[]> {
        return await this.commentModel.find();
    }
    async create(comment: createCommentDto) {
        return await this.commentModel.create(comment);
    }
    async delete(id:string) {
        if (!id) {
            throw new HttpException('comment did not find', 404);
        }
        return await this.commentModel.findByIdAndDelete(id);
    }
    async update(comment:createCommentDto,id:string): Promise<Comment> {    
        return await this.commentModel.findByIdAndUpdate(id, comment, { new: true });
    }
    async getCommentsById(id:string): Promise<Comment[]> {
        return await this.commentModel.find({ postId: id }).populate('postId', 'title -_id');
    }

}
