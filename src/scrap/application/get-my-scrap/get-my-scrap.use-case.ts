import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { ScrapEntity } from 'src/scrap/infrastructure/orm-entity/scrap.entity';
import { GetMyScrapRequestDto } from './dto/get-my-scrap.request.dto';
import { GetMyScrapResponseDto } from './dto/get-my-scrap.response.dto';
import {
  ARTICLE_QUERY_REPOSITORY,
  ArticleQueryRepository,
} from 'src/article/query/domain/repository/article.query.repository';

@Injectable()
export class GetMyScrapUseCase {
  constructor(
    @InjectRepository(ScrapEntity)
    private readonly scrapRepository: ScrapRepository,
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(getMyScrapRequestDto: GetMyScrapRequestDto) {
    // const { userId } = getMyScrapRequestDto;
    // const scraps = await this.scrapRepository.findByUserId(userId);
    // const articleIds = scraps.map((scrap) => scrap.articleId.value);
    const articles = await this.articleQueryRepository.findAllByCriteria();

    // 임시로직 -> 다른 방법이 있는 지 탐색 예정
    // join vs repostiory 두 개에서 각각 가져오기
    return articles;
  }
}
