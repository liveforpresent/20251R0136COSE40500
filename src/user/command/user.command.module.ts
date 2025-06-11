import { Module } from '@nestjs/common';
import { UserCommandController } from './presentation/user.command.controller';
import { USER_COMMAND_REPOSITORY } from './domain/user.command.repository';
import { UserCommandRepositoryImpl } from './infrastructure/user.command.repository.impl';

@Module({
  imports: [],
  providers: [
    {
      provide: USER_COMMAND_REPOSITORY,
      useClass: UserCommandRepositoryImpl,
    },
  ],
  controllers: [UserCommandController],
})
export class UserCommandModule {}
