import { Injectable } from '@nestjs/common';
import { BaseOAuthProvider } from './base-oauth.provider';
import { KakaoOAuthProvider } from './kakao.provider';
import { OAuthProviderType } from 'src/auth/command/domain/value-object/oauth-provider.enum';

@Injectable()
export class OAuthProviderFactory {
  private readonly providers: Record<OAuthProviderType, BaseOAuthProvider>;

  constructor(kakao: KakaoOAuthProvider) {
    this.providers = {
      [OAuthProviderType.KAKAO]: kakao,
    };
  }

  getProvider(oAuthProviderType: OAuthProviderType): BaseOAuthProvider {
    const oAuthProvider = this.providers[oAuthProviderType];
    if (!oAuthProvider) throw new Error(`OAuth provider ${oAuthProviderType} not found`);

    return oAuthProvider;
  }
}
