import { useState } from "react";
import { HttpUserRepository } from "../infrastructure/HttpUserRepository";
import { getUsers } from "./use-cases/getUsers";
import type { User } from "../domain/User";

const repo = new HttpUserRepository();

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  async function load() {
    setUsers(await getUsers(repo));
  }

  return { users, load };
}
