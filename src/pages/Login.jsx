import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onLogin?.(); // mock auth
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login (Simulasi)</h1>
      <form
        onSubmit={submit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full rounded-lg border-gray-300"
            placeholder="you@bank.co.id"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full rounded-lg border-gray-300"
          />
        </div>
        <button className="w-full py-2 rounded-xl bg-black text-white font-medium">
          Masuk
        </button>
      </form>
    </div>
  );
}
