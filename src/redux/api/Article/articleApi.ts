import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from 'src/global/endpoints';
import { IArticle } from 'src/models/ArticleModel';
import {
  AddArticleRequest,
  AddArticleResponse,
  ArticleData,
  ArticleIdInterface,
  DeleteArticleResponse,
  GetAllArticlesResponse,
  UpdateArticleRequest,
  decodeArticlesResponse
} from './article.interface';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    // Get All Articles
    getAllArticles: builder.query<IArticle[], void>({
      query: () => ({
        url: '/article'
      }),
      providesTags: ['Articles'],
      transformResponse: (
        response: GetAllArticlesResponse<ArticleData>
      ): IArticle[] => decodeArticlesResponse(response)
    }),
    // Delete a Article
    deleteArticle: builder.mutation<
      DeleteArticleResponse<ArticleData>,
      ArticleIdInterface
    >({
      query: (params) => ({
        url: `/article/${params.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Articles']
    }),
    // Add a Article
    addArticle: builder.mutation<
      AddArticleResponse<ArticleData>,
      AddArticleRequest
    >({
      query: (body) => ({
        url: '/article',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Articles']
    }),

    // update Article
    updateArticle: builder.mutation<
      AddArticleResponse<ArticleData>,
      UpdateArticleRequest
    >({
      query: (body) => ({
        url: `/article/${body.id}`,
        method: 'PUT',
        body: {
          ArticleName: body.ArticleName,
          ArticleContent: body.ArticleContent
        }
      }),
      invalidatesTags: ['Articles']
    })
  })
});

export const {
  useGetAllArticlesQuery,
  useDeleteArticleMutation,
  useAddArticleMutation,
  useUpdateArticleMutation
} = articleApi;
