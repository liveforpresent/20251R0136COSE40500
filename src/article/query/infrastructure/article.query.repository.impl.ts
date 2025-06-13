import { InjectRepository } from '@mikro-orm/nestjs';
import { GetArticleDetailProjection } from '../domain/projection/get-article-detail.projection';
import { ArticleQueryRepository } from '../domain/repository/article.query.repository';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { GetArticleListProjection } from '../domain/projection/get-article-list.projection';

export class ArticleQueryRepositoryImpl implements ArticleQueryRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly ormRepository: EntityRepository<ArticleEntity>,
  ) {}

  async findById(id: string): Promise<GetArticleDetailProjection | null> {
    const articleEntity = await this.ormRepository
      .createQueryBuilder('a')
      .select([
        'id',
        'title',
        'organization',
        'description',
        'location',
        'startAt',
        'endAt',
        'scrapCount',
        'viewCount',
        'registrationUrl',
      ])
      .where({ id: id })
      .getSingleResult();

    if (!articleEntity) return null;

    return {
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      description: articleEntity.description,
      location: articleEntity.location,
      startAt: articleEntity.startAt.toISOString(),
      endAt: articleEntity.endAt.toISOString(),
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
      registrationUrl: articleEntity.registrationUrl,
    };
  }

  async findAllByCriteria(): Promise<GetArticleListProjection[]> {
    const articleEntities = await this.ormRepository
      .createQueryBuilder('a')
      .select(['id', 'title', 'organization', 'scrapCount', 'viewCount'])
      .getResultList();

    const result = articleEntities.map((articleEntity) => ({
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
    }));

    return result;
  }
}
