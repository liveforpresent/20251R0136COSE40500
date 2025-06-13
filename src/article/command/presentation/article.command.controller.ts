import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleUseCase } from '../application/create/create.usecase';
import { CreateArticleRequestDto } from '../application/create/dto/create.request.dto';
import { CreateArticleResponseDto } from '../application/create/dto/create.response.dto';

@ApiTags('article')
@Controller('article')
export class ArticleCommandController {
  constructor(private readonly createArticleUseCase: CreateArticleUseCase) {}

  @Post()
  async createArticle(@Body() reqDto: CreateArticleRequestDto): Promise<CreateArticleResponseDto> {
    return await this.createArticleUseCase.execute(reqDto);
  }
}
