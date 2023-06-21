import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from 'src/global/endpoints';
import { IError } from 'src/models/ErrorModel';
import {
  AddErrorRequest,
  AddErrorResponse,
  DeleteErrorResponse,
  ErrorData,
  ErrorIdInterface,
  GetAllErrorsResponse,
  UpdateErrorRequest,
  decodeErrorsResponse
} from './error.interface';
import { getCurrentUser } from 'src/shared/helpers/getUser';

export const errorApi = createApi({
  reducerPath: 'errorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL
  }),
  tagTypes: ['Errors', 'UserErrors'],
  keepUnusedDataFor: 0.1,
  endpoints: (builder) => ({
    // Get All Errors
    getAllErrors: builder.query<IError[], void>({
      query: () => ({
        url: '/error'
      }),
      providesTags: ['Errors'],
      transformResponse: (
        response: GetAllErrorsResponse<ErrorData>
      ): IError[] => decodeErrorsResponse(response)
    }),
    // Delete a error
    deleteError: builder.mutation<
      DeleteErrorResponse<IError>,
      ErrorIdInterface
    >({
      query: (params) => ({
        url: `/error/${params.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['UserErrors']
    }),
    // Add error
    addError: builder.mutation<AddErrorResponse<IError>, AddErrorRequest>({
      query: (body) => ({
        url: '/error',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Errors']
    }),
    // Get All User Errors
    getUserErrors: builder.query({
      query: (params) => {
        return {
          url: `/user/${params.id}`
        };
      },
      providesTags: ['Errors']
    }),
    // get Error By Id
    GetErrorById: builder.query<IError, ErrorIdInterface>({
      query: (params) => ({
        url: `/error/${params.id}`
      })
    }),
    // update Error
    updateError: builder.mutation<
      AddErrorResponse<ErrorData>,
      UpdateErrorRequest
    >({
      query: (body) => ({
        url: `/error/${body.id}`,
        method: 'PUT',
        body: {
          ErrorName: body.ErrorName,
          ErrorDescription: body.ErrorDescription
        }
      }),
      invalidatesTags: ['UserErrors']
    })
  })
});

export const {
  useGetAllErrorsQuery,
  useDeleteErrorMutation,
  useAddErrorMutation,
  useUpdateErrorMutation,
  useGetUserErrorsQuery,
  useGetErrorByIdQuery
} = errorApi;
