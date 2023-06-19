import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from 'src/global/endpoints';
import {
  SolutionData,
  SolutionIdInterface,
  DeleteSolutionResponse,
  GetAllSolutionsResponse,
  decodeSolutionsResponse,
  AddSolutionResponse,
  AddSolutionRequest,
  UpdateSolutionRequest,
  AddSolutionToErrorRequest
} from './solution.interface';
import { ISolution } from 'src/models/SolutionsModel';

export const solutionApi = createApi({
  reducerPath: 'solutionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL
  }),
  tagTypes: ['Solutions'],
  endpoints: (builder) => ({
    // Get All Solutions
    getAllSolutions: builder.query<ISolution[], void>({
      query: () => ({
        url: '/solution'
      }),
      providesTags: ['Solutions'],
      transformResponse: (
        response: GetAllSolutionsResponse<SolutionData>
      ): ISolution[] => decodeSolutionsResponse(response)
    }),
    // Delete a category
    deleteSolution: builder.mutation<
      DeleteSolutionResponse<SolutionData>,
      SolutionIdInterface
    >({
      query: (params) => ({
        url: `/solution/${params.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Solutions']
    }),
    // Add solution
    addSolution: builder.mutation<
      AddSolutionResponse<SolutionData>,
      AddSolutionRequest
    >({
      query: (body) => ({
        url: '/solution',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Solutions']
    }),
    // update Solution
    updateSolution: builder.mutation<
      AddSolutionResponse<SolutionData>,
      UpdateSolutionRequest
    >({
      query: (body) => ({
        url: `/solution/${body.id}`,
        method: 'PUT',
        body: {
          score: body.score,
          code: body.code,
          guide: body.guide
        }
      }),
      invalidatesTags: ['Solutions']
    }),
    // Add solution to Error
    addSolutionToError: builder.mutation<
      AddSolutionResponse<SolutionData>,
      AddSolutionToErrorRequest
    >({
      query: (body) => ({
        url: `/solution/${body.id}/solutions`,
        method: 'POST',
        body: {
          code: body.code,
          guide: body.guide
        }
      }),
      invalidatesTags: ['Solutions']
    })
  })
});

export const {
  useGetAllSolutionsQuery,
  useDeleteSolutionMutation,
  useAddSolutionMutation,
  useUpdateSolutionMutation,
  useAddSolutionToErrorMutation
} = solutionApi;
