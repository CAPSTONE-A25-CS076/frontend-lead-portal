import { Lock } from "lucide-react";

export default function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
        <Lock className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
      <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
    </div>
  );
}