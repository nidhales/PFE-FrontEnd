import { ISolution } from "./SolutionsModel";

export interface IError {
  id: string;
  ErrorName: string;
  ErrorDescription: string;
  solutions: ISolution[];
}

