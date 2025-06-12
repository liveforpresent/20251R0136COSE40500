import { Module } from '@nestjs/common';
import { OAuthLoginUseCase } from './application/oauth-login/oauth-login.usecase';
import { RenewTokenUseCase } from './application/renew-token/renew-token.usecase';
import { LogoutUseCase } from './application/logout/logout.usecase';
import { AUTH_COMMAND_REPOSITORY } from './domain/auth.command.repository';
import { AuthCommandRepositoryImpl } from './infrastructure/auth.command.repository.impl';
import { AuthCommandController } from './presentation/auth.command.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthEntity } from './infrastructure/auth.entity';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';
import { UserCommandModule } from 'src/user/command/user.command.module';
import { OAuthProviderFactory } from '../common/infrastructure/oauth/oauth-provider.factory';
import { JwtProvider } from '../common/infrastructure/jwt/jwt.provider';
import { KakaoOAuthProvider } from '../common/infrastructure/oauth/kakao.provider';
import { JwtAccessStrategy } from '../common/infrastructure/jwt/jwt-access.strategy';
import { JwtRefreshStrategy } from '../common/infrastructure/jwt/jwt-refresh.strategy';
import { JwtModule } from '@nestjs/jwt';

const usecases = [OAuthLoginUseCase, RenewTokenUseCase, LogoutUseCase];

@Module({
  imports: [JwtModule.register({}), MikroOrmModule.forFeature([AuthEntity, UserEntity]), UserCommandModule],
  providers: [
    ...usecases,
    {
      provide: AUTH_COMMAND_REPOSITORY,
      useClass: AuthCommandRepositoryImpl,
    },
    OAuthProviderFactory,
    KakaoOAuthProvider,
    JwtProvider,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthCommandController],
})
export class AuthCommandModule {}
