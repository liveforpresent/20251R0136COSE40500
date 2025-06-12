import { InjectRepository } from '@mikro-orm/nestjs';
import { UserInfoProjection } from '../../domain/projection/get-my-info.projection';
import { UserQueryRepository } from '../../domain/repository/user.query.repository';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';

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
