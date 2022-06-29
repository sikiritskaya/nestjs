import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostService } from './post.service';

@Controller('/api')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private postService: PostService){}

    @Get('/posts')
    getAllPosts(){
        return this.postService.getAll()
    }

    @Post('/posts')
    createPost(@Body() postDto: CreatePostDto) {
        return this.postService.create(postDto);    
    }

    @Get('/users/:id')
    getPostsById(@Param('id') id: string){
        return this.postService.getPostById(id)
    }

    @Delete('/posts/:id/')
    delete(@Param('id') id: string){
        return this.postService.delete(id)
    }

    @Put('/posts/:id/')
    update(@Body() postDto: CreatePostDto, @Param('id') id: string) {
        return this.postService.update(postDto, id)
    }


}
