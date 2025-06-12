import { Cascade, Entity, OneToOne, Property, Unique } from '@mikro-orm/core';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';
import { OAuthProviderType } from '../domain/value-object/oauth-provider.enum';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'auth' })
@Unique({ properties: ['oauthId', 'provider'] })
export class AuthEntity extends BaseEntity {
  @Property({ type: 'varchar', unique: true })
  oauthId: string;

  @Property({ type: 'varchar' })
  provider: OAuthProviderType;

  @Property({ type: 'varchar', unique: true, nullable: true })
  refreshToken: string | null;

  @OneToOne(() => UserEntity, (user) => user.auth, {
    owner: true,
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
    unique: true,
  })
  user: UserEntity;
}
