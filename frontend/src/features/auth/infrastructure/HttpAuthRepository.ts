import { csrf, http } from "../../../shared/http";
import type { User } from "../../users/domain/User";
import type { AuthReposiroty } from "../domain/AuthRepository";

export class HttpAuthRepository implements AuthReposiroty {
  async login(email: string, password: string): Promise<User> {
    await csrf();
    return (await http("POST", "/login", { email, password })) as User;
  }
}
