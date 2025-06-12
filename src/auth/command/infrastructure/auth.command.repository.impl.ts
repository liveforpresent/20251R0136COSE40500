import { InjectRepository } from '@mikro-orm/nestjs';
import { Auth } from '../domain/auth';
import { AuthCommandRepository } from '../domain/auth.command.repository';
import { AuthEntity } from './auth.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { AuthMapper } from './auth.mapper';
import { OAuthProviderType } from '../domain/value-object/oauth-provider.enum';

export class AuthCommandRepositoryImpl implements AuthCommandRepository {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly ormRepository: EntityRepository<AuthEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(auth: Auth): Promise<void> {
    const authEntity = AuthMapper.toEntity(auth, this.em);
    await this.em.persistAndFlush(authEntity);
  }

  async update(auth: Auth): Promise<void> {
    await this.em.nativeUpdate(
      AuthEntity,
      { id: auth.id.value },
      {
        refreshToken: auth.refreshToken,
        updatedAt: auth.updatedAt,
      },
    );
  }

  async findByOAuthIdandProvider(oauthId: string, provider: OAuthProviderType): Promise<Auth | null> {
    const authEntity = await this.ormRepository.findOne({ oauthId, provider });
    if (!authEntity) return null;

    return AuthMapper.toDomain(authEntity);
  }

  async findByRefreshToken(refreshToken: string): Promise<Auth | null> {
    const authEntity = await this.ormRepository.findOne({ refreshToken });
    if (!authEntity) return null;

    return AuthMapper.toDomain(authEntity);
  }

  async findByUserId(userId: string): Promise<Auth | null> {
    const authEntity = await this.ormRepository.findOne({ user: userId });
    if (!authEntity) return null;

    return AuthMapper.toDomain(authEntity);
  }
}
