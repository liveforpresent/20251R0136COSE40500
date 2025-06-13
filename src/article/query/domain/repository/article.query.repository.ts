import { GetArticleDetailProjection } from '../projection/get-article-detail.projection';
import { GetArticleListProjection } from '../projection/get-article-list.projection';

export interface ArticleQueryRepository {
  findById(id: string): Promise<GetArticleDetailProjection | null>;
  findAllByCriteria(): Promise<GetArticleListProjection[]>;
}

export const ARTICLE_QUERY_REPOSITORY = Symbol('ARTICLE_QUERY_REPOSITORY');
