import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from 'src/global/endpoints';
import { ISubject } from 'src/models/SubjectModel';
import {
  AddSubjectRequest,
  AddSubjectResponse,
  DeleteSubjectResponse,
  GetAllSubjectsResponse,
  SubjectData,
  SubjectIdInterface,
  UpdateSubjectRequest,
  decodeSubjectsResponse
} from './subject.interface';

export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL
  }),
  tagTypes: ['Subjects'],
  endpoints: (builder) => ({
    // Get All Subjects
    getAllSubjects: builder.query<ISubject[], void>({
      query: () => ({
        url: '/subject'
      }),
      providesTags: ['Subjects'],
      transformResponse: (
        response: GetAllSubjectsResponse<SubjectData>
      ): ISubject[] => decodeSubjectsResponse(response)
    }),
    // Delete a Subject
    deleteSubject: builder.mutation<
      DeleteSubjectResponse<SubjectData>,
      SubjectIdInterface
    >({
      query: (params) => ({
        url: `/subject/${params.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Subjects']
    }),
    // Add Subject
    addSubject: builder.mutation<
      AddSubjectResponse<SubjectData>,
      AddSubjectRequest
    >({
      query: (body) => ({
        url: '/subject',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Subjects']
    }),
    // update Subject
    updateSubject: builder.mutation<
      AddSubjectResponse<SubjectData>,
      UpdateSubjectRequest
    >({
      query: (body) => ({
        url: `/subject/${body.id}`,
        method: 'PUT',
        body: { subjectName: body.subjectName }
      }),
      invalidatesTags: ['Subjects']
    })
  })
});

export const {
  useGetAllSubjectsQuery,
  useDeleteSubjectMutation,
  useAddSubjectMutation,
  useUpdateSubjectMutation
} = subjectApi;
