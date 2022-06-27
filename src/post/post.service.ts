import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from './post.model';
import { createPostDto } from 'src/dto/create-post.dto';


@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async getAll(): Promise<Post[]> {
        return await this.postModel.find().exec();
    }
    async create(post: createPostDto): Promise<Post> {
        const newPost = await this.postModel.create(post)
        return newPost.save()
    }
    async delete(id: string): Promise<Post> {
        if (!id) {
            throw new HttpException('post did not find', HttpStatus.BAD_REQUEST);
        }
        return await this.postModel.findByIdAndDelete(id);
    }
    async update(post: createPostDto, id: string): Promise<Post>{
        if (!id) {
            throw new HttpException('post did not find', HttpStatus.BAD_REQUEST);
        }
        return await this.postModel.findByIdAndUpdate(id, post, { new: true });
    }
    async getPostById(id: string): Promise<Post[]> {
        return await this.postModel.find({ userId: id }).populate('userId', 'username -_id');
    }
}
