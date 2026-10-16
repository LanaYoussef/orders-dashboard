import { useState } from "react";
import { HttpAuthRepository } from "../infrastructure/HttpAuthRepository";
import { LoginUser as LoginUser } from "./use-cases/LoginUser";
import type { User } from "../../users/domain/User";

const repo = new HttpAuthRepository();
export function useAuth() {
  const [me, setMe] = useState<User | null>(null);
  const [error, setError] = useState("");
  async function login(email: string, password: string) {
    setError("");
    try {
      setMe(await LoginUser(repo, email, password));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  }
  return { me, error, login };
}
