import client from './client';

export interface RegisterData {
  email: string;
  hashed_password: string;
  full_name: string;
  country: string;
  age?: number;
  agree_to_terms_and_conditions: boolean;
}

export interface LoginData {
  email: string;
  hashed_password: string;
}

export const userService = {
  register: (data: RegisterData) => client.post('/register', data),
  login: (data: LoginData) => client.post('/login', data),
};
