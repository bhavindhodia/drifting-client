enum UserRole {
  STUDENT,
  TEACHER,
}

export type UserDataType = {
  authStrategy: string;
  email: string;
  id: string;
  isEmailVerified: boolean;
  name: string;
  refreshToken: [{ refreshToken: string }];
  role: UserRole;
  username: string;
};

export type AuthContextType = {
  success: boolean;
  token: string | null;
  userData?: UserDataType | null;
  role: UserRole;
  errorMessage?: string;
  redirectPath: string;
};
