export interface FullUser {
  email: string;
  username: string;
  password: string;
  uuid: string;
}

export interface ErrorType {
  message: string;
}

export interface ErrorResponder {
  status: number;
  msg: string;
}
