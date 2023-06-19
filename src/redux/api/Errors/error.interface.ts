import { IError } from 'src/models/ErrorModel';
import { ISolution } from 'src/models/SolutionsModel';

export interface ErrorData {
  _id: string;
  ErrorName: string;
  ErrorDescription: string;
  solutions: ISolution[];
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
    solutions: error.solutions
  }));

  return errors;
};
