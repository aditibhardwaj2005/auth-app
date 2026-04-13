import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;   // Change name if you use different cookie

  // If no token → redirect to login
  if (!token) {
    redirect('/login');
  }

  // Optional: You can verify the token here if needed

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <p>You are successfully logged in 🎉</p>
      
      {/* Add your dashboard content here */}
      <button 
        onClick={() => {/* logout logic */}}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}