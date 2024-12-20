import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();

    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
    static type = "Email hoặc mật khẩu không đúng";
    static kind = "InvalidEmailPasswordError";
}

export class InActiveUserError extends AuthError {
    static type = "Tài khoản chưa được kích hoạt";
    static kind = "InActiveUserError";
}