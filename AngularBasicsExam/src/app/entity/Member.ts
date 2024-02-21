export class Member {
  id: number;
  name: string;
  preName: string;
  username: string;
  password: string;
  department: string;
  workingHours: number;
  urlToProfilePicture: string;

  constructor(id: number, name: string, preName: string, username: string, password: string, department: string, workingHours: number, urlToProfilePicture: string) {
    this.id = id;
    this.name = name;
    this.preName = preName;
    this.username = username;
    this.password = password;
    this.department = department;
    this.workingHours = workingHours;
    this.urlToProfilePicture = urlToProfilePicture;
  }

}
