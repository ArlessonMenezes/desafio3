import { User } from "src/user/model/user.entity";

export class PayloadDto {
  email: string;

  constructor(user: User) {
    this.email = user.email;
  }
}