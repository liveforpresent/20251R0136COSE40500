import { Module } from '@nestjs/common';
import { GetArticleDetailUseCase } from './application/get-article-detail/get-article-detail.usecase';
import { GetArticleListUseCase } from './application/get-article-list/get-article-list.usecase';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticleEntity } from '../command/infrastructure/article.entity';
import { ArticleQueryController } from './presentation/article.query.controller';

const usecases = [GetArticleDetailUseCase, GetArticleListUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity])],
  providers: [...usecases],
  controllers: [ArticleQueryController],
})
export class ArticleQueryModule {}
