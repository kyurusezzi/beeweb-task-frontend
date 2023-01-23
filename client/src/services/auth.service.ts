import { ApiService } from "./api.service";
import { LoginRequestDto, SignUpRequestDto } from "./interfaces/auth.interface";

export class AuthService {
  static setToken(token: string): void {
    localStorage.setItem("token", token);
  }
  static getToken(): string | null {
    return localStorage.getItem("token");
  }
  static removeToken() {
    localStorage.removeItem("token");
  }

  public async signUp(
    data: SignUpRequestDto
  ): Promise<{ success: boolean; user: any }> {
    const { token, user } = await ApiService.post("/signup", data);

    AuthService.setToken(token);
    return { success: true, user };
  }

  public async login(
    data: LoginRequestDto
  ): Promise<{ success: boolean; user: any }> {
    const { token, user } = await ApiService.post("/login", data);
    AuthService.setToken(token);
    return { success: true, user };
  }
}

export const authService = new AuthService();

export default AuthService;
