import { IArticle } from 'src/models/ArticleModel';

export interface ArticleData {
  _id: string;
  ArticleName: string;
  ArticleContent: string;
}

export interface GetAllArticlesResponse<T> {
  message: string;
  articleData: T[];
}

export interface ArticleIdInterface {
  id: string;
}

export interface DeleteArticleResponse<T> {
  message: string;
  deletedArticle: T;
}
export interface AddArticleRequest {
  ArticleName: string;
  ArticleContent: string;
}
export interface AddArticleResponse<T> {
  message: string;
  newArticle: T;
}

export interface UpdateArticleRequest {
  id: string;
  ArticleName: string;
  ArticleContent: string;
}

export const decodeArticlesResponse = (
  response: GetAllArticlesResponse<ArticleData>
): IArticle[] => {
  const data: ArticleData[] = response.articleData;

  const articles: IArticle[] = data.map((article) => ({
    id: article._id,
    ArticleName: article.ArticleName,
    ArticleContent: article.ArticleContent
  }));

  return articles;
};
