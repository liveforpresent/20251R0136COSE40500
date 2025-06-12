import { UserInfoProjection } from '../projection/get-my-info.projection';

export interface UserQueryRepository {
  findById(userId: string): Promise<UserInfoProjection | null>;
}

export const USER_QUERY_REPOSITORY = Symbol('USER_QUERY_RPEOSITORY');
