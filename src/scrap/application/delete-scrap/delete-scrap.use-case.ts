import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { ScrapEntity } from 'src/scrap/infrastructure/orm-entity/scrap.entity';
import { DeleteScrapRequestDto } from './dto/delete-scrap.request.dto';
import {
  ARTICLE_QUERY_REPOSITORY,
  ArticleQueryRepository,
} from 'src/article/query/domain/repository/article.query.repository';

@Injectable()
export class DeleteScrapUseCase {
  constructor(
    @InjectRepository(ScrapEntity)
    private readonly scrapRepository: ScrapRepository,
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(deleteScrapRequestDto: DeleteScrapRequestDto) {
    const { articleId, userId } = deleteScrapRequestDto;

    await this.scrapRepository.deleteByArticleIdAndUserId(articleId, userId);
    await this.decreaseArticleScrapCount(articleId);
  }

  private async decreaseArticleScrapCount(articleId: string): Promise<void> {
    /*
    const article = await this.articleRepository.findById(articleId);
    if (!article) throw new NotFoundException('해당 게시글이 존재하지 않습니다.');

    article.decreaseScrapCount();
    await this.articleRepository.update(article);
    */
  }
}
