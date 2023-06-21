import { UserData } from 'src/redux/api/Users/user.interface';

export interface ISolution {
  id: string;
  score: number;
  code: string;
  guide: string;
  user: UserData;
}
