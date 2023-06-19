export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface RegisterResponse {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  email: string;
  password: string;
}
