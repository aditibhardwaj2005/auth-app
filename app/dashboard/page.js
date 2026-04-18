"use client";

import { redirect } from 'next/navigation';

export default async function Dashboard() {
 

  const handleLogout = () => {
    cookieStore.delete('authToken');
    redirect('/login');
  }

  // Optional: You can verify the token here if needed

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <p>You are successfully logged in 🎉</p>

      <button
        onClick={handleLogout}
        type="button"

        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}