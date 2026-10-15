import { http } from "C:/Users/Lenovo/Documents/Tomorrow services/task1/frontend/src/shared/http.ts";
import type { User } from "../domain/User";
import type { UserRepository } from "../domain/UserRepository";

export class HttpUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const data = (await http("GET", "/api/users")) as User[];
    return data;
  }
}
