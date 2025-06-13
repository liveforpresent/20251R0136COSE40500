import { Module } from '@nestjs/common';
import { ScrapController } from './presentation/scrap.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapEntity } from 'src/scrap/infrastructure/orm-entity/scrap.entity';
import { SCRAP_REPOSITORY } from './domain/repository/scrap.repository';
import { ScrapRepositoryImpl } from './infrastructure/repository/scrap.repository.impl';
import { GetMyScrapUseCase } from './application/get-my-scrap/get-my-scrap.use-case';
import { AddScrapUseCase } from './application/add-scrap/add-scrap.use-case';
import { CheckScrapUseCase } from './application/check-scrap/check-scrap.use-case';
import { DeleteScrapUseCase } from './application/delete-scrap/delete-scrap.use-case';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';
import { ARTICLE_QUERY_REPOSITORY } from 'src/article/query/domain/repository/article.query.repository';
import { ArticleQueryRepositoryImpl } from 'src/article/query/infrastructure/article.query.repository.impl';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';

const useCases = [GetMyScrapUseCase, AddScrapUseCase, CheckScrapUseCase, DeleteScrapUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ScrapEntity, UserEntity, ArticleEntity])],
  providers: [
    ...useCases,
    {
      provide: SCRAP_REPOSITORY,
      useClass: ScrapRepositoryImpl,
    },
    {
      provide: ARTICLE_QUERY_REPOSITORY,
      useClass: ArticleQueryRepositoryImpl,
    },
  ],
  controllers: [ScrapController],
})
export class ScrapModule {}
