import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from 'src/global/endpoints';
import { ICategory } from 'src/models/CategoryModel';
import {
  AddCategoryRequest,
  AddCategoryResponse,
  CategoryData,
  CategoryIdInterface,
  DeleteCategoryResponse,
  GetAllCategoriesResponse,
  UpdateCategoryRequest,
  decodeCategoriesResponse
} from './category.interfaces';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    // Get All Categories
    getAllCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: '/category'
      }),
      providesTags: ['Categories'],
      transformResponse: (
        response: GetAllCategoriesResponse<CategoryData>
      ): ICategory[] => decodeCategoriesResponse(response)
    }),
    // Delete a category
    deleteCategory: builder.mutation<
      DeleteCategoryResponse<CategoryData>,
      CategoryIdInterface
    >({
      query: (params) => ({
        url: `/category/${params.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Categories']
    }),
    // Add a category
    addCategory: builder.mutation<
      AddCategoryResponse<CategoryData>,
      AddCategoryRequest
    >({
      query: (body) => ({
        url: '/category',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Categories']
    }),
    //Update Category
    updateCategory: builder.mutation<
      AddCategoryResponse<CategoryData>,
      UpdateCategoryRequest
    >({
      query: (body) => ({
        url: `/category/${body.id}`,
        method: 'PUT',
        body: { name: body.name }
      }),
      invalidatesTags: ['Categories']
    })
  })
});

export const {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation
} = categoryApi;
