import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    // handle login logic
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
