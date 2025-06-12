import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { createDocs } from 'src/shared/presentation/docs/base.docs';

export type AuthQueryEndpoint = 'oauthAuthorization';

export const AuthQueryDocs = createDocs<AuthQueryEndpoint>({
  oauthAuthorization: () =>
    applyDecorators(
      ApiOperation({
        summary: 'OAuth 로그인 요청',
        description: 'OAuth 로그인 요청 처리. OAuth Provider로부터 인증 URL을 받아 리다이렉트',
      }),
      ApiOkResponse({
        description: 'OAuth 로그인 창으로 리다이렉트',
      }),
    ),
});
