export interface PasswordChangeRequest {
  token: string;
  email: string;
  password: string;
  passwordRepeat: string;
}
