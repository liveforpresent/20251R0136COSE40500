import { Inject, Injectable } from '@nestjs/common';
import { AUTH_COMMAND_REPOSITORY, AuthCommandRepository } from '../../domain/auth.command.repository';
import { OAuthLoginResponseDto } from './dto/oauth-login.response.dto';
import { OAuthLoginRequestDto } from './dto/oauth-login.request.dto';
import { Transactional } from '@mikro-orm/core';
import { Auth } from '../../domain/auth';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { OAuthProviderType } from '../../domain/value-object/oauth-provider.enum';
import { Role } from 'src/user/command/domain/value-object/role.enum';
import { CreateUserUseCase } from 'src/user/command/application/create/create.usecase';
import { OAuthProviderFactory } from 'src/auth/common/infrastructure/oauth/oauth-provider.factory';
import { JwtProvider } from 'src/auth/common/infrastructure/jwt/jwt.provider';
import { TokenType } from 'src/auth/common/infrastructure/jwt/jwt.factory';

@Injectable()
export class OAuthLoginUseCase {
  private readonly now: Date;
  constructor(
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    private readonly jwtProvider: JwtProvider,
    @Inject(AUTH_COMMAND_REPOSITORY)
    private readonly authCommandRepository: AuthCommandRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {
    this.now = new Date();
  }

  @Transactional()
  async execute(requestDto: OAuthLoginRequestDto): Promise<OAuthLoginResponseDto> {
    const { oAuthProviderType, code } = requestDto;
    const { oauthId, provider, email } = await this.getOAuthUserInfo(oAuthProviderType, code);
    const auth = await this.findOrCreateUser(oauthId, provider, email);
    const { accessToken, refreshToken } = await this.generateAndSaveTokens(auth);

    return { accessToken, refreshToken };
  }

  // 소셜로그인 유저저 정보 가져오기
  private async getOAuthUserInfo(oAuthProviderType: OAuthProviderType, code: string) {
    const oAuthprovider = this.oAuthProviderFactory.getProvider(oAuthProviderType);
    const token = await oAuthprovider.getToken(code);

    return await oAuthprovider.getUserInfo(token);
  }

  // 유저 생성 및 정보 가져오기
  private async findOrCreateUser(oauthId: string, provider: OAuthProviderType, email: string): Promise<Auth> {
    const existingAuth = await this.authCommandRepository.findByOAuthIdandProvider(oauthId, provider);
    if (existingAuth) return existingAuth;

    const userId = Identifier.create();
    await this.createUserUseCase.execute({
      userId,
      email,
      role: Role.GENERAL,
    });

    const auth = Auth.create({
      id: Identifier.create(),
      createdAt: this.now,
      updatedAt: this.now,
      oauthId: oauthId,
      provider: provider,
      refreshToken: null,
      userId: userId,
    });

    await this.authCommandRepository.save(auth);

    return auth;
  }

  // 토큰 생성 및 저장
  private async generateAndSaveTokens(auth: Auth) {
    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, auth.userId.value);
    const { token: refreshToken, jti } = await this.jwtProvider.generateToken(TokenType.REFRESH, auth.userId.value);

    auth.updateRefreshToken(jti, this.now);
    await this.authCommandRepository.update(auth);

    return { accessToken, refreshToken };
  }
}
