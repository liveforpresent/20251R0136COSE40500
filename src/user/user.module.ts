import { Module } from '@nestjs/common';
import { UserQueryModule } from './query/user.query.module';
import { UserCommandModule } from './command/user.command.module';

@Module({
  imports: [UserCommandModule, UserQueryModule],
})
export class UserModule {}
