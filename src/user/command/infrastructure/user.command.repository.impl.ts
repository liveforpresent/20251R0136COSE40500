import { InjectRepository } from '@mikro-orm/nestjs';
import { UserCommandRepository } from '../domain/user.command.repository';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { User } from '../domain/user';
import { UserMapper } from './user.mapper';

export class UserCommandRepositoryImpl implements UserCommandRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(user: User): Promise<void> {
    const userEntity = UserMapper.toEntity(user);
    await this.em.persistAndFlush(userEntity);
  }

  async deleteById(userId: string): Promise<void> {}
}
