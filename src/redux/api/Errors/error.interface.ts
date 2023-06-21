import { IError } from 'src/models/ErrorModel';
import { ISolution } from 'src/models/SolutionsModel';
import { UserData } from '../Users/user.interface';
import { ICategory } from 'src/models/CategoryModel';
import { ITag } from 'src/models/TagModel';

export interface ErrorData {
  _id: string;
  ErrorName: string;
  ErrorDescription: string;
  solutions: ISolution[];
  categories: ICategory[];
  tags: ITag[];
  user: UserData;
}

export interface GetAllErrorsResponse<T> {
  message: string;
  errorData: T[];
}

export interface AddErrorRequest {
  ErrorName: string;
  ErrorDescription: string;
}

export interface AddErrorResponse<T> {
  message: string;
  newError: T;
}

export interface ErrorIdInterface {
  id: string;
}

export interface UserIdErrorInterface {
  id: string;
}

export interface DeleteErrorResponse<T> {
  message: string;
  deletedError: T;
}

export interface UpdateErrorRequest {
  id: string;
  ErrorName: string;
  ErrorDescription: string;
}

export const decodeErrorsResponse = (
  response: GetAllErrorsResponse<ErrorData>
): IError[] => {
  const data: ErrorData[] = response.errorData;

  const errors: IError[] = data.map((error) => ({
    id: error._id,
    ErrorName: error.ErrorName,
    ErrorDescription: error.ErrorDescription,
    solutions: error.solutions,
    tags: error.tags,
    categories: error.categories,
    user: error.user
  }));

  return errors;
};
