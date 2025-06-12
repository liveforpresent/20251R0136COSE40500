import { Injectable } from '@nestjs/common';
import { OAuthProviderFactory } from 'src/auth/common/infrastructure/oauth/oauth-provider.factory';
import { AuthorizeOAuthResponseDto } from './dto/authorize-oauth.response.dto';
import { AuthorizeOAuthRequestDto } from './dto/authorize-oauth.request.dto';

@Injectable()
export class AuthorizeOAuthUseCase {
  constructor(private readonly oAuthProviderFactory: OAuthProviderFactory) {}

  execute(requestDto: AuthorizeOAuthRequestDto): AuthorizeOAuthResponseDto {
    const { oAuthProviderType } = requestDto;
    const provider = this.oAuthProviderFactory.getProvider(oAuthProviderType);
    const authUrl = provider.getAuthorizationUrl();

    return { authUrl };
  }
}
