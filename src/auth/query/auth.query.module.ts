import { Module } from '@nestjs/common';
import { AuthQueryController } from './presentation/auth.query.controller';
import { AuthorizeOAuthUseCase } from './application/authorize-oauth/authorize-oauth.use-case';
import { OAuthProviderFactory } from '../common/infrastructure/oauth/oauth-provider.factory';
import { KakaoOAuthProvider } from '../common/infrastructure/oauth/kakao.provider';

const usecases = [AuthorizeOAuthUseCase];

@Module({
  imports: [],
  providers: [...usecases, OAuthProviderFactory, KakaoOAuthProvider],
  controllers: [AuthQueryController],
})
export class AuthQueryModule {}
