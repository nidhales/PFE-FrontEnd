import { ISolution } from 'src/models/SolutionsModel';
import { User } from 'src/models/User';
import { UserData } from '../Users/user.interface';

export interface SolutionData {
  _id: string;
  score: number;
  code: string;
  guide: string;
  user: UserData;
}

export interface GetAllSolutionsResponse<T> {
  message: string;
  solutionData: T[];
}

export interface AddSolutionRequest {
  score: number;
  code: string;
  guide: string;
}

export interface AddSolutionResponse<T> {
  message: string;
  newSolution: T;
}

export interface SolutionIdInterface {
  id: string;
}

export interface UpdateSolutionRequest {
  id: string;
  score: number;
  code: string;
  guide: string;
}

export interface DeleteSolutionResponse<T> {
  message: string;
  deletedSolution: T;
}

export interface AddSolutionToErrorRequest {
  userId: string;
  id: string;
  code: string;
  guide: string;
}

export const decodeSolutionsResponse = (
  response: GetAllSolutionsResponse<SolutionData>
): ISolution[] => {
  const data: SolutionData[] = response.solutionData;

  const solutions: ISolution[] = data.map((solution) => ({
    id: solution._id,
    score: solution.score,
    code: solution.code,
    guide: solution.guide,
    user: solution.user
  }));

  return solutions;
};
