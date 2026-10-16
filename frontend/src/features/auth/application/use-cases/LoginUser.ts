import type { AuthRepository } from "../../domain/AuthRepository";

export function LoginUser(
  repo: AuthRepository,
  email: string,
  password: string,
) {
  return repo.login(email, password);
}
