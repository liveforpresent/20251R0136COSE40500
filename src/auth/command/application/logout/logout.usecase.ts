import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AUTH_COMMAND_REPOSITORY, AuthCommandRepository } from '../../domain/auth.command.repository';
import { LogoutRequestDto } from './dto/logout.request.dto';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(AUTH_COMMAND_REPOSITORY)
    private readonly authCommandRepository: AuthCommandRepository,
  ) {}

  async execute(requestDto: LogoutRequestDto): Promise<void> {
    const { userId } = requestDto;
    const auth = await this.authCommandRepository.findByUserId(userId);
    if (!auth) throw new InternalServerErrorException('해당 유저의 인증 정보가 없습니다.');

    auth.updateRefreshToken(null, new Date());
    await this.authCommandRepository.update(auth);
  }
}
