// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { signOut } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function DashboardPage() {
//     const { user, loading } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (!loading && !user) {
//             router.push("/login");
//         }
//     }, [user, loading, router]);

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <p>Welcome: {user?.email}</p>

//             <button onClick={() => signOut(auth)}>
//                 Logout
//             </button>
//         </div>
//     );
// }
"use client"; // Required for hooks in Next.js App Router

import { useState } from 'react';
import { useFirebaseListener } from '@/hooks/useFirebaseListener';

export default function RealTimePage() {
  const [language, setLanguage] = useState('ar');
  const { data, loading, error } = useFirebaseListener(language);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Firebase Real-time Monitor</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setLanguage('ar')}>Switch to Arabic (ar)</button>
        <button onClick={() => setLanguage('en')} style={{ marginLeft: '10px' }}>Switch to English (en)</button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h3>Path: <span style={{ color: 'blue' }}>elnemr123/CAPA/{language}</span></h3>
        
        {loading && <p>Connecting to Firebase...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {!loading && !error && (
          <div>
            <strong>Current Value:</strong>
            <pre style={{ background: '#f4f4f4', padding: '10px' }}>
              {typeof data === 'object' ? JSON.stringify(data, null, 2) : data || 'No data found'}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}