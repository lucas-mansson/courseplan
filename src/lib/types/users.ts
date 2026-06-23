export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface UserWithHashedPassword extends User {
  password_hash: string;
}

