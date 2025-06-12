import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { ScrapRepositoryImpl } from '../repository/scrap.repository.impl';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';

@Entity({ tableName: 'scrap', repository: () => ScrapRepositoryImpl })
@Unique({ properties: ['article', 'user'] })
export class ScrapEntity extends BaseEntity {
  @ManyToOne(() => ArticleEntity, { deleteRule: 'cascade' })
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, { deleteRule: 'cascade' })
  user: UserEntity;
}
