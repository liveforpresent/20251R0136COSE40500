import { Module } from '@nestjs/common';
import { ARTICLE_REPOSITORY } from './domain/repository/article.repository';
import { ArticleRepositoryImpl } from './infrastructure/repository/article.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticleEntity } from './infrastructure/orm-entity/article.entity';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';
import { ArticleController } from './presentation/article.controller';
import { ArticleList } from './application/get/article.list';
import { ArticleDetail } from './application/get/article.detail';
import { ArticleCreate } from './application/post/article.create';
import { DeleteArticle } from './application/delete/delete.article';
import { MediaModule } from 'src/media/media.module';
import { ArticleCommandModule } from './command/article.command.module';
import { ArticleQueryModule } from './query/article.query.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([ArticleEntity, MediaEntity, TagEntity]),
    MediaModule,
    ArticleCommandModule,
    ArticleQueryModule,
  ],
  controllers: [ArticleController],
  providers: [
    {
      provide: ARTICLE_REPOSITORY,
      useClass: ArticleRepositoryImpl,
    },
    ArticleList,
    ArticleDetail,
    ArticleCreate,
    DeleteArticle,
  ],
})
export class ArticleModule {}
