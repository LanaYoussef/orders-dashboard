import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import LoginForm from "../auth/LoginForm";

export default function LoginPage() {
  const { me, ready, error, login } = useAuth();

  if (!ready) return null;
  if (me) return <Navigate to="/orders" replace />;

  return <LoginForm error={error} onSubmit={login} />;
}
