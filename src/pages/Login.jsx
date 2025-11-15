import { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";

export default function LoginPage({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    
    // Simulasi delay loading
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsLoading(false);
    onLogin?.(credentials);
  };

  return (
    <div className=" flex justify-center p-4">
      <div className="w-full max-w-md">
        <LoginHeader />

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}