import { InjectRepository } from '@mikro-orm/nestjs';
import { UserInfoProjection } from '../../domain/projection/get-my-info.projection';
import { UserQueryRepository } from '../../domain/repository/user.query.repository';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

export class UserQueryRepositoryImpl implements UserQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async findById(userId: string): Promise<UserInfoProjection | null> {
    const userEntity = await this.ormRepository
      .createQueryBuilder('u')
      .select(['id', 'email'])
      .where({ id: userId })
      .getSingleResult();

    if (!userEntity) return null;

    return { email: userEntity.email };
  }
}
