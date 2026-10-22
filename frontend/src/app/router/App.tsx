import { useSession } from "../../shared/lib/usesession";
import UserTable from "../../features/users/presentation/UsersTable";
import LoginForm from "../../features/auth/presentation/LoginForm";
import { http } from "../../shared/http";
import { useAuth } from "../../features/auth/application/useAuth";
import { useState } from "react";
export default function App() {
  const { users, signIn } = useSession();
  const { me, error, login, setMe } = useAuth();

  if (!me) {
    return <LoginForm error="" onSubmit={signIn} />;
  }
  return (
    <div>
      <p>
        Welcome {me.firstName} {me.lastName}
      </p>

      <UserTable users={users} />
      <button
        type="button"
        onClick={() => {
          void http("POST", "/logout").then(() => setMe(null));
        }}
      >
        logout
      </button>
    </div>
  );
}
