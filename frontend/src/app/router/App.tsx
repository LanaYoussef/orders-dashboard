import UserTable from "../../features/users/presentation/UsersTable";
import LoginForm from "../../features/auth/presentation/LoginForm";
import { http } from "../../shared/http";
import { useSession } from "../../shared/lib/usesession";
export default function App() {
  const { me, users, signIn, setMe, error } = useSession();

  if (!me) {
    return <LoginForm error={error} onSubmit={signIn} />;
  }
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark">
        <div className="container">
          <span className="navbar-brand">User Management</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">
              {me.firstName} {me.lastName}
            </span>
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={() => {
                void http("POST", "/logout").finally(() => setMe(null));
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <h1 className="h4 mb-3 text-center">Users</h1>
        <div className="card">
          <div className="card-body p-0">
            <UserTable users={users} />
          </div>
        </div>
      </div>
    </>
  );
}
