import { IsEnum, IsNotEmpty } from 'class-validator';
import { OAuthProviderType } from 'src/auth/command/domain/value-object/oauth-provider.enum';

export class AuthorizeOAuthRequestDto {
  @IsEnum(OAuthProviderType)
  @IsNotEmpty()
  oAuthProviderType: OAuthProviderType;
}
