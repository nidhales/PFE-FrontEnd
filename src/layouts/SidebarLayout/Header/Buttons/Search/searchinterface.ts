import { ICategory } from 'src/models/CategoryModel';
import { ISolution } from 'src/models/SolutionsModel';
import { ITag } from 'src/models/TagModel';
import { UserData } from 'src/redux/api/Users/user.interface';

export interface SearchResult {
  id: string;
  ErrorName: string;
  ErrorDescription: string;
}

export interface SearchResultResponse {
  _id: string;
  ErrorName: string;
  ErrorDescription: string;
  solutions: ISolution[];
  tags: ITag[];
  categories: ICategory[];
  user: UserData;
}
