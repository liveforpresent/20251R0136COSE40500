import { InjectRepository } from '@mikro-orm/nestjs';
import { Article } from '../domain/article';
import { ArticleCommandRepository } from '../domain/article.command.repository';
import { ArticleMapper } from './article.mapper';
import { ArticleEntity } from './article.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';

export class ArticleCommandRepositoryImpl implements ArticleCommandRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly ormRepository: EntityRepository<ArticleEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(article: Article): Promise<void> {
    const articleEntity = ArticleMapper.toEntity(article);

    // Get references to existing tags
    const tagRefs = await Promise.all(
      article.tags.map((tag) => {
        return this.em.getReference(TagEntity, tag.id.value);
      }),
    );
    articleEntity.tags.set(tagRefs);

    await this.em.persistAndFlush(articleEntity);
  }

  async update(article: Article): Promise<void> {
    await this.em.nativeUpdate(
      ArticleEntity,
      { id: article.id.value },
      {
        title: article.title,
        organization: article.organization,
        location: article.location,
        description: article.description,
        registrationUrl: article.registrationUrl,
        startAt: article.startAt,
        endAt: article.endAt,
        scrapCount: article.scrapCount,
        viewCount: article.viewCount,
      },
    );
  }
}
