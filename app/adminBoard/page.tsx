"use client";

import { useState, useEffect } from "react";

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_LOGIN;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-7 md:space-y-8 bg-white p-6 sm:p-7 md:p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-extrabold text-emerald-900">
            Адмін панель
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-sm text-teal-700">
            Введіть свої облікові дані для доступу до адмін панелі
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-6 sm:mt-7 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6">
          <div className="rounded-md space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Логін
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded relative block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 text-xs sm:text-sm md:text-sm"
                placeholder="Логін"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 text-xs sm:text-sm md:text-sm"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent text-xs sm:text-sm md:text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {loading ? "Вхід..." : "Увійти"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl md:text-xl font-semibold">
                Адмін панель
              </h1>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <button
                onClick={onLogout}
                className="ml-0 sm:ml-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm md:text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6 sm:py-8 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 sm:mb-6">
          Управління
        </h2>
        {/* 
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-3 sm:mb-4">
            {error}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}
