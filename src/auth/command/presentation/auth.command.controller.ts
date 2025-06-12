import { Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { OAuthLoginUseCase } from '../application/oauth-login/oauth-login.usecase';
import { RenewTokenUseCase } from '../application/renew-token/renew-token.usecase';
import { LogoutUseCase } from '../application/logout/logout.usecase';
import { OAuthProviderType } from '../domain/value-object/oauth-provider.enum';
import { Response } from 'express';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthCommandDocs } from './auth.command.docs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthCommandController {
  constructor(
    private readonly oAuthLoginUseCase: OAuthLoginUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Get('login/oauth/callback')
  @AuthCommandDocs('oauthCallback')
  async oAuthLogin(@Query('code') code: string, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.oAuthLoginUseCase.execute({
      oAuthProviderType: OAuthProviderType.KAKAO,
      code,
    });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @AuthCommandDocs('renewToken')
  async renewToken(@User() user: UserPayload, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.renewTokenUseCase.execute({ userId: user.userId, jti: user.jti });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-access'))
  @AuthCommandDocs('logout')
  async logout(@User() user: UserPayload, @Res() res: Response) {
    await this.logoutUseCase.execute({ userId: user.userId });

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }
}
