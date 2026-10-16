import type { AuthReposiroty } from "../../domain/AuthRepository";

export function LoginUser(
  repo: AuthReposiroty,
  email: string,
  password: string,
) {
  return repo.login(email, password);
}
