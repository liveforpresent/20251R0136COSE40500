import { Controller, Get, Res } from '@nestjs/common';
import { AuthorizeOAuthUseCase } from '../application/authorize-oauth/authorize-oauth.use-case';
import { OAuthProviderType } from 'src/auth/command/domain/value-object/oauth-provider.enum';
import { Response } from 'express';
import { AuthQueryDocs } from './auth.query.docs';

@Controller('auth')
export class AuthQueryController {
  constructor(private readonly authorizeOAuthUseCase: AuthorizeOAuthUseCase) {}

  @Get('oauth/authorization')
  @AuthQueryDocs('oauthAuthorization')
  authorizeOAuth(@Res() res: Response) {
    const { authUrl } = this.authorizeOAuthUseCase.execute({ oAuthProviderType: OAuthProviderType.KAKAO });

    res.redirect(authUrl);
  }
}
