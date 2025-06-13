import { Module } from '@nestjs/common';
import { GetArticleDetailUseCase } from './application/get-article-detail/get-article-detail.usecase';
import { GetArticleListUseCase } from './application/get-article-list/get-article-list.usecase';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticleEntity } from '../command/infrastructure/article.entity';
import { ArticleQueryController } from './presentation/article.query.controller';
import { ARTICLE_QUERY_REPOSITORY } from './domain/repository/article.query.repository';
import { ArticleQueryRepositoryImpl } from './infrastructure/article.query.repository.impl';

const usecases = [GetArticleDetailUseCase, GetArticleListUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity])],
  providers: [
    ...usecases,
    {
      provide: ARTICLE_QUERY_REPOSITORY,
      useClass: ArticleQueryRepositoryImpl,
    },
  ],
  controllers: [ArticleQueryController],
})
export class ArticleQueryModule {}
