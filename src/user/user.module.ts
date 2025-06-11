import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './infrastructure/orm-entity/user.entity';
import { ScrapEntity } from '../scrap/infrastructure/orm-entity/scrap.entity';
import { UserQueryModule } from './query/user.query.module';
import { UserCommandModule } from './command/user.command.module';

@Module({
  imports: [UserCommandModule, UserQueryModule, MikroOrmModule.forFeature([UserEntity, ScrapEntity])],
})
export class UserModule {}
