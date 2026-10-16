import type { User } from "../../users/domain/User.ts";

export interface AuthReposiroty {
  login(email: string, password: string): Promise<User>;
}
