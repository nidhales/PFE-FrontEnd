import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from 'src/global/endpoints';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse
} from './auth.interfaces';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL
  }),
  endpoints: (builder) => ({
    //Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      })
    }),
    //Register
    register: builder.mutation<RegisterRequest, RegisterResponse>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation } = authApi;
