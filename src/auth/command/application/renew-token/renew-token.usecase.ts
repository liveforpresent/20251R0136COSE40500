import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_COMMAND_REPOSITORY, AuthCommandRepository } from '../../domain/auth.command.repository';
import { RenewTokenResponseDto } from './dto/renew-token.response.dto';
import { RenewTokenRequestDto } from './dto/renew-token.request.dto';
import { JwtProvider } from 'src/auth/common/infrastructure/jwt/jwt.provider';
import { TokenType } from 'src/auth/common/infrastructure/jwt/jwt.factory';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    @Inject(AUTH_COMMAND_REPOSITORY)
    private readonly authCommandRepository: AuthCommandRepository,
  ) {}

  async execute(reqeustDto: RenewTokenRequestDto): Promise<RenewTokenResponseDto> {
    const { userId, jti } = reqeustDto;
    const auth = await this.authCommandRepository.findByRefreshToken(jti);
    if (!auth || userId != auth.userId.value) throw new UnauthorizedException('유효하지 않은 refresh token 입니다. a');

    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, userId);
    const { token: refreshToken, jti: newJti } = await this.jwtProvider.generateToken(TokenType.REFRESH, userId);

    auth.updateRefreshToken(newJti, new Date());
    await this.authCommandRepository.update(auth);

    return { accessToken, refreshToken };
  }
}
