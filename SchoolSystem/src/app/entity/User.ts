export class User {
  id: number | undefined;
  username: string;
  password: string;
  admin: boolean | undefined;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
