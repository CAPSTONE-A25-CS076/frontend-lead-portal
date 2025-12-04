import { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import { login } from "../utils/api";

export default function LoginPage({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token);
      onLogin?.(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex justify-center p-4">
      <div className="w-full max-w-md">
        <LoginHeader />

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
