import AuthService from "./auth.service";

const HOST = "http://localhost:4000";

export class ApiService {
  static getHeaders(options?: {
    includeAuth?: boolean;
    headers?: { [key: string]: string };
  }) {
    const headers: any = {
      "Content-Type": "application/json",
    };
    if (options?.includeAuth) {
      headers.Authorization = `Bearer ${AuthService.getToken()}`;
    }

    return { ...(options?.headers || {}), ...headers };
  }
  static async get(path: string, includeAuth?: boolean) {
    const response = await fetch(`${HOST}${path}`, {
      method: "GET",
      headers: this.getHeaders({ includeAuth }),
    });

    return response.json();
  }

  static async post(path: string, body: any, includeAuth?: boolean) {
    const response = await fetch(`${HOST}${path}`, {
      method: "POST",
      headers: this.getHeaders({ includeAuth }),
      body: JSON.stringify(body),
    });
    return response.json();
  }
}
