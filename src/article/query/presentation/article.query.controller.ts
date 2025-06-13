import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetArticleDetailUseCase } from '../application/get-article-detail/get-article-detail.usecase';
import { GetArticleListUseCase } from '../application/get-article-list/get-article-list.usecase';
import { GetArticleDetailProjection } from '../domain/projection/get-article-detail.projection';
import { GetArticleListProjection } from '../domain/projection/get-article-list.projection';

@ApiTags('article')
@Controller('article')
export class ArticleQueryController {
  constructor(
    private readonly getArticleDetailUseCase: GetArticleDetailUseCase,
    private readonly getArticleListUseCase: GetArticleListUseCase,
  ) {}

  @Get(':id')
  async getArticleDetail(@Param('id') articleId: string): Promise<GetArticleDetailProjection> {
    return await this.getArticleDetailUseCase.execute({ articleId });
  }

  @Get()
  async getArticleList(): Promise<GetArticleListProjection[]> {
    return await this.getArticleListUseCase.execute();
  }
}
