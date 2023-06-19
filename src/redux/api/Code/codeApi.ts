import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from 'src/global/endpoints';
import { ICode } from 'src/models/CodeModel';
import {
  AddCodeRequest,
  AddCodeResponse,
  CodeData,
  CodeIdInterface,
  DeleteCodeResponse,
  GetAllCodesResponse,
  UpdateCodeRequest,
  decodeCodesResponse
} from './code.interface';

export const codeApi = createApi({
  reducerPath: 'codeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL
  }),
  tagTypes: ['Codes'],
  endpoints: (builder) => ({
    // Get All Codes
    getAllCodes: builder.query<ICode[], void>({
      query: () => ({
        url: '/code'
      }),
      providesTags: ['Codes'],
      transformResponse: (response: GetAllCodesResponse<CodeData>): ICode[] =>
        decodeCodesResponse(response)
    }),
    // Delete a code
    deleteCode: builder.mutation<DeleteCodeResponse<CodeData>, CodeIdInterface>(
      {
        query: (params) => ({
          url: `/code/${params.id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Codes']
      }
    ),
    // Add a code
    addCode: builder.mutation<AddCodeResponse<CodeData>, AddCodeRequest>({
      query: (body) => ({
        url: '/code',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Codes']
    }),
    // update Solution
    updateCode: builder.mutation<AddCodeResponse<CodeData>, UpdateCodeRequest>({
      query: (body) => ({
        url: `/code/${body.id}`,
        method: 'PUT',
        body: {
          title: body.title,
          content: body.content,
          classeDeLogs: body.classeDeLogs,
          config: body.config,
          recommendation: body.recommendation
        }
      }),
      invalidatesTags: ['Codes']
    })
  })
});

export const {
  useGetAllCodesQuery,
  useDeleteCodeMutation,
  useAddCodeMutation,
  useUpdateCodeMutation
} = codeApi;
