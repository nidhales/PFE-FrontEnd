import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from 'src/global/endpoints';
import {
  AddUserRequest,
  AddUserResponse,
  DeleteUserResponse,
  GetAllUsersResponse,
  UpdateUserRequest,
  UserBadgeDecoderResponse,
  UserBadgeRequest,
  UserData,
  UserIdInterface,
  decodeUsersResponse
} from './user.interface';
import { IUser } from 'src/models/UserModal';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    // Get All Users
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: '/user'
      }),
      providesTags: ['Users'],
      transformResponse: (response: GetAllUsersResponse<UserData>): IUser[] =>
        decodeUsersResponse(response)
    }),
    // Delete a user
    deleteUser: builder.mutation<DeleteUserResponse<UserData>, UserIdInterface>(
      {
        query: (params) => ({
          url: `/user/${params.id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Users']
      }
    ),
    // Add a user
    addUser: builder.mutation<AddUserResponse<UserData>, AddUserRequest>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Users']
    }),
    //Update User
    updateUser: builder.mutation<AddUserResponse<UserData>, UpdateUserRequest>({
      query: (body) => ({
        url: `/user/${body.id}`,
        method: 'PUT',
        body: {
          FirstName: body.FirstName,
          LastName: body.LastName,
          PhoneNumber: body.PhoneNumber,
          email: body.email,
          password: body.password
        }
      }),
      invalidatesTags: ['Users']
    }),

    //Update User
    userBadge: builder.query<UserBadgeDecoderResponse[], UserBadgeRequest>({
      query: (body) => ({
        url: `/user/badges/${body.id}`,
        method: 'GET'
      }),
    })
  })
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useUserBadgeQuery
} = userApi;
