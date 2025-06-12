import { Module } from '@nestjs/common';
import { UserQueryController } from './presentation/user.query.controller';
import { GetMyInfoUseCase } from './application/get-my-info/get-my-info.usecase';
import { USER_QUERY_REPOSITORY } from './domain/repository/user.query.repository';
import { UserQueryRepositoryImpl } from './infrastructure/repository/user.query.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from '../command/infrastructure/user.entity';

const usecases = [GetMyInfoUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [
    ...usecases,
    {
      provide: USER_QUERY_REPOSITORY,
      useClass: UserQueryRepositoryImpl,
    },
  ],
  controllers: [UserQueryController],
})
export class UserQueryModule {}
