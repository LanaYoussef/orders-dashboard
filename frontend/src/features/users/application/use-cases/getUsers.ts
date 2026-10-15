import type { UserRepository } from "../../domain/UserRepository";

export function getUsers(repo: UserRepository) {
  return repo.getAll();
}
