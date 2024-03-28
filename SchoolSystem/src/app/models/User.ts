export interface User {
  id?: number | undefined;
  username: string;
  password: string;
  admin?: boolean | undefined;
}
