import { Badge } from 'src/redux/api/Users/user.interface';

export interface IUser {
  id: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  email: string;
  badges: Badge;
}
