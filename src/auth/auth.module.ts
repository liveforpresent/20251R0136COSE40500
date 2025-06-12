import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserCommandModule } from 'src/user/command/user.command.module';
import { AuthCommandModule } from './command/auth.command.module';
import { AuthQueryModule } from './query/auth.query.module';

@Module({
  imports: [JwtModule.register({}), AuthCommandModule, AuthQueryModule, PassportModule, UserCommandModule],
})
export class AuthModule {}
