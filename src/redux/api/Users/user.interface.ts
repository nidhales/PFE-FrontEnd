import { IUser } from 'src/models/UserModal';

export interface UserData {
  _id: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  email: string;
}

export interface UserBadgeRequest {
  id: string;
}

export interface UserBadgeDecoderResponse {
  _id: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  email: string;
  password: string;
  role: string;
  __v: number;
  badges: Badge;
}
interface Badge {
  _id: string;
  name: string;
  __v: number;
}
export interface GetAllUsersResponse<T> {
  message: string;
  userData: T[];
}

export interface UserIdInterface {
  id: string;
}

export interface DeleteUserResponse<T> {
  message: string;
  deletedUser: T;
}

export interface AddUserRequest {
  name: string;
}

export interface UpdateUserRequest {
  id: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  email: string;
  password: string;
}

export interface AddUserResponse<T> {
  message: string;
  newUser: T;
}

export const decodeUsersResponse = (
  response: GetAllUsersResponse<UserData>
): IUser[] => {
  const data: UserData[] = response.userData;

  const users: IUser[] = data.map((user) => ({
    id: user._id,
    FirstName: user.FirstName,
    LastName: user.LastName,
    PhoneNumber: user.PhoneNumber,
    email: user.email
  }));

  return users;
};

export const decodeUserBadgeResponse = (
  response: UserBadgeDecoderResponse
): string => {
  return response.badges[0].name;
};
