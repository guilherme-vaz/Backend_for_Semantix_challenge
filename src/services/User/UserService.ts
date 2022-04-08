import UserRepository from "src/repositories/UserRepository.ts";
import User from "src/models/User";


export default class UserService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async createUser(email: string, fullName: string, cellphone: string, password: string): Promise<User> {
    const newUser = new User(email, fullName, cellphone, password)

    return await this.userRepository.createUser(newUser);
  }

  async updateUser(partialUser: Partial<User>) {
    return await this.userRepository.updateUser(partialUser);
  }

  async deleteUserById(id: string) {
    return await this.userRepository.deleteUserById(id);
  }
}
