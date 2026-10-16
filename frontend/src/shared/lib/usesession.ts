import { useAuth } from "../../features/auth/application/useAuth";
import { useUsers } from "../../features/users/application/useUsers";

export function useSession() {
  const { me, error, login } = useAuth();
  const { users, load } = useUsers();

  async function signIn(email: string, password: string) {
    await login(email, password);
    await load();
  }

  return { me, error, users, signIn };
}
