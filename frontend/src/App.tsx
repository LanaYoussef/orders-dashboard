import { useState } from "react";
import { getUsers, login } from "./api";
import type { User } from "./types";

export default function App() {
  const [me, setMe] = useState<User | null>(null);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  async function handleLogin() {
    setError("");
    try {
      setMe(await login(email, password));
      setUsers(await getUsers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  if (!me) {
    return (
      <form
        className="addform mx-auto mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          void handleLogin();
        }}
      >
        <h1>Login</h1>
        <div className="formrow">
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formrow">
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Login
        </button>

        {error && <p className="errormsg">{error}</p>}
      </form>
    );
  }

  return (
    <div>
      <header>
        <h1>User Management</h1>
      </header>
      <p>
        Hello {me.firstName} {me.lastName}
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.orderCount ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
