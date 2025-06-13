import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { TagRepositoryImpl } from '../repository/tag.repository.impl';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';

@Entity({ tableName: 'tag', repository: () => TagRepositoryImpl })
export class TagEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  name: string;

  @ManyToMany(() => ArticleEntity, (article) => article.tags, { nullable: true })
  articles = new Collection<ArticleEntity>(this);
}
