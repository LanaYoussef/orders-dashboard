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
      <div className="min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-5">
              <h1 className="h4 mb-3 text-center">Login</h1>
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
              {error && (
                <p className="text-danger mt-3 mb-0 text-center">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
