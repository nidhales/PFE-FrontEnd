export interface ParsedUser {
  _id: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  email: string;
  password: string;
  role: string;
  image: string;
  __v: number;
  badges: string[];
}

export interface EditTabProps {
  parsedUser: ParsedUser;
}
