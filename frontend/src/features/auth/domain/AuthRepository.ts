import type { User } from "../../users/domain/User.ts";

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
}
