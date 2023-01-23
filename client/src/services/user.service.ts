import { ApiService } from "./api.service";
class UserService {
  public async getUsers() {
    const users = await ApiService.get("/users");
    return users;
  }
}

const userService = new UserService();

export default userService;

//this service only for convention cause I had endpoint in backend
