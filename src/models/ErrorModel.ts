import { UserData } from 'src/redux/api/Users/user.interface';
import { ISolution } from './SolutionsModel';
import { ITag } from './TagModel';
import { ICategory } from './CategoryModel';

export interface IError {
  id: string;
  ErrorName: string;
  ErrorDescription: string;
  solutions: ISolution[];
  tags: ITag[];
  categories: ICategory[];
  user: UserData;
}
