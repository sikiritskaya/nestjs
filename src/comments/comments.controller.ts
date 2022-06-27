import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createCommentDto } from 'src/dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('/api')
//@UseGuards(new JwtAuthGuard('jwt'))
export class CommentsController {
    constructor(private commentService: CommentsService){}
    @Get('/comments')
    getAllUsers(){
        return this.commentService.getAll()
    }

    @Post('/comments')
    createPost(@Body() commentDto: createCommentDto) {
        return this.commentService.create(commentDto);    
    }

    @Get('/posts/:id')
    getPostsById(@Param('id') id:string){
        return this.commentService.getCommentsById(id)
    }

    @Delete('/comments/:id/')
    delete(@Param('id') id:string){
        return this.commentService.delete(id)
    }

    @Put('/comments/:id')
    update(@Body() commentDto: createCommentDto, @Param('id') id:string){
        return this.commentService.update(commentDto, id)
    }
}
