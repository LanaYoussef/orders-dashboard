import { csrf, http } from "../../../shared/http";
import type { User } from "../../users/domain/User";
import type { AuthRepository } from "../domain/AuthRepository";

export class HttpAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<User> {
    await csrf();
    return (await http("POST", "/login", { email, password })) as User;
  }
}
