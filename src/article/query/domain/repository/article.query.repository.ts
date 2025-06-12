import { GetArticleDetailProjection } from '../projection/get-article-detail.projection';

export interface ArticleQueryRepository {
  findById(id: string): Promise<GetArticleDetailProjection | null>;
}
