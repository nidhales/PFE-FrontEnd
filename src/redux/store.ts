import { configureStore } from '@reduxjs/toolkit';

import {
  categoryApi,
  solutionApi,
  codeApi,
  userApi,
  errorApi,
  subjectApi,
  articleApi,
  authApi
} from './api';

const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [solutionApi.reducerPath]: solutionApi.reducer,
    [codeApi.reducerPath]: codeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      solutionApi.middleware,
      codeApi.middleware,
      userApi.middleware,
      errorApi.middleware,
      subjectApi.middleware,
      articleApi.middleware,
      authApi.middleware
    )
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
