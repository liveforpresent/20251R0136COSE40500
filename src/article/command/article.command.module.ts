import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ArticleEntity } from './infrastructure/article.entity';
import { ArticleCommandController } from './presentation/article.command.controller';
import { CreateArticleUseCase } from './application/create/create.usecase';
import { UpdateArticleUseCase } from './application/update/update.usecase';
import { DeleteArticleUseCase } from './application/delete/delete.usecase';
import { ARTICLE_COMMAND_REPOSITORY } from './domain/article.command.repository';
import { ArticleCommandRepositoryImpl } from './infrastructure/article.command.repository.impl';

const usecases = [CreateArticleUseCase, UpdateArticleUseCase, DeleteArticleUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity])],
  providers: [
    ...usecases,
    {
      provide: ARTICLE_COMMAND_REPOSITORY,
      useClass: ArticleCommandRepositoryImpl,
    },
  ],
  controllers: [ArticleCommandController],
})
export class ArticleCommandModule {}
