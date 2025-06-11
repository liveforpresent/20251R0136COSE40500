import { Module } from '@nestjs/common';
import { UserQueryController } from './presentation/user.query.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [UserQueryController],
})
export class UserQueryModule {}
