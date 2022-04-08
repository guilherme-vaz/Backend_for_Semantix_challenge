import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcryptjs';

class User {
  public readonly id: string;

  public readonly createdAt: string;

  public email: string;

  public fullName: string;

  public cellphone: string;

  public password: string;

  constructor(
      email: string,
      fullName: string,
      cellphone: string,
      password: string,
  ) {
      this.id = uuidv4();
      this.createdAt = new Date().toISOString();
      this.email = email;
      this.fullName = fullName;
      this.cellphone = cellphone;
      this.password = hashSync(password);
  }
}

export default User;
