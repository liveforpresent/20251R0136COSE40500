import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_QUERY_REPOSITORY, UserQueryRepository } from '../../domain/repository/user.query.repository';
import { GetMyInfoRequestDto } from './dto/get-my-info.request.dto';
import { UserInfoProjection } from '../../domain/projection/get-my-info.projection';

@Injectable()
export class GetMyInfoUseCase {
  constructor(
    @Inject(USER_QUERY_REPOSITORY)
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(reqDto: GetMyInfoRequestDto): Promise<UserInfoProjection> {
    const result = await this.userQueryRepository.findById(reqDto.userId);
    if (!result) throw new NotFoundException('존재하지 않는 유저입니다.');

    return result;
  }
}
