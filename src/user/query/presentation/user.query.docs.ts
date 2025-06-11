import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';
import { UserInfoProjection } from '../domain/projection/get-my-info.projection';

export type UserQueryEndpoint = 'getMyInfo';

export const UserQueryDocs = createDocs<UserQueryEndpoint>({
  getMyInfo: () =>
    applyDecorators(
      ApiOperation({
        summary: '본인 정보 조회',
        description: '로그인 사용자 정보 조회',
      }),
      ApiOkResponse({
        description: '사용자 이메일 정보 반환',
        type: UserInfoProjection,
      }),
      ApiUnauthorizedResponse({
        description: '유효하지 않은 access token',
      }),
      ApiNotFoundResponse({
        description: '존재하지 않는 사용자',
      }),
    ),
});
