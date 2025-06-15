import { InjectRepository } from '@mikro-orm/nestjs';
import { GetArticleDetailProjection } from '../domain/projection/get-article-detail.projection';
import { ArticleQueryRepository } from '../domain/repository/article.query.repository';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { GetArticleListProjection } from '../domain/projection/get-article-list.projection';

export class ArticleQueryRepositoryImpl implements ArticleQueryRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly ormRepository: EntityRepository<ArticleEntity>,
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<GetArticleDetailProjection | null> {
    const articleEntity = (
      await this.ormRepository
        .createQueryBuilder('a')
        .select([
          'a.id',
          'a.title',
          'a.organization',
          'a.description',
          'a.location',
          'a.startAt',
          'a.endAt',
          'a.scrapCount',
          'a.viewCount',
          'a.registrationUrl',
          't.media_path as thumbnailPath',
        ])
        .leftJoin('a.media', 'm')
        .leftJoin('a.thumbnail', 't')
        .where({ id: id })
        .execute<GetArticleDetailProjection[]>()
    )[0];

    if (!articleEntity) return null;

    return {
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      description: articleEntity.description,
      location: articleEntity.location,
      startAt: articleEntity.startAt,
      endAt: articleEntity.endAt,
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
      registrationUrl: articleEntity.registrationUrl,
      thumbnailPath: articleEntity.thumbnailPath,
    };
  }

  async findAllByCriteria(): Promise<GetArticleListProjection[]> {
    const articleEntities = await this.ormRepository
      .createQueryBuilder('a')
      .select(['a.id', 'a.title', 'a.organization', 'a.scrapCount', 'a.viewCount', 't.media_path as thumbnailPath'])
      .leftJoin('a.thumbnail', 't')
      .execute<GetArticleListProjection[]>();

    const result = articleEntities.map((articleEntity) => ({
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
      thumbnailPath: articleEntity.thumbnailPath,
    }));

    return result;
  }
}
