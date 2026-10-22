import { useState } from "react";

type Props = {
  error: string;
  onSubmit: (email: string, password: string) => void;
};

export default function LoginForm({ error, onSubmit }: Props) {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
    >
      <h1>Login</h1>
      <div>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
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
      {error && <p>{error}</p>}
    </form>
  );
}
