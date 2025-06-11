import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetMyInfoUseCase } from '../application/get-my-info/get-my-info.usecase';
import { AuthGuard } from '@nestjs/passport';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { UserInfoProjection } from '../domain/projection/get-my-info.projection';

@Controller('user')
export class UserQueryController {
  constructor(private readonly getMyInfoUseCase: GetMyInfoUseCase) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt-access'))
  async getMyInfo(@User() user: UserPayload): Promise<UserInfoProjection> {
    return await this.getMyInfoUseCase.execute({ userId: user.userId });
  }
}
