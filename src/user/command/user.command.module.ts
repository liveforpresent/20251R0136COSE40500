import { Module } from '@nestjs/common';
import { UserCommandController } from './presentation/user.command.controller';
import { USER_COMMAND_REPOSITORY } from './domain/user.command.repository';
import { UserCommandRepositoryImpl } from './infrastructure/user.command.repository.impl';
import { CreateUserUseCase } from './application/create/create.usecase';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '../infrastructure/orm-entity/user.entity';

const usecases = [CreateUserUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [
    ...usecases,
    {
      provide: USER_COMMAND_REPOSITORY,
      useClass: UserCommandRepositoryImpl,
    },
  ],
  controllers: [UserCommandController],
  exports: [...usecases],
})
export class UserCommandModule {}
