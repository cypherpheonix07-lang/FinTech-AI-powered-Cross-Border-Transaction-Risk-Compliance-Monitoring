import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase'; // Adjust path based on your exact alias configuration!

export default function FirebaseDemo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<unknown[]>([]);

  // 1. Listen to Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Google Sign-In Logic
  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  // 3. Google Sign-Out Logic
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  // 4. Firestore Database Interaction (Write)
  const handleAddLog = async () => {
    if (!user) return;
    try {
      const docRef = await addDoc(collection(db, "audit_logs"), {
        uid: user.uid,
        action: "User viewed their dashboard",
        timestamp: new Date().toISOString(),
      });
      console.log("Written securely with ID: ", docRef.id);
      fetchLogs(); // Refresh list immediately
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // 5. Firestore Database Interaction (Read)
  const fetchLogs = async () => {
    try {
      const q = query(collection(db, "audit_logs"), limit(5));
      const querySnapshot = await getDocs(q);
      const fetchedLogs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(fetchedLogs);
    } catch (error) {
      console.error("Error fetching logs: ", error);
    }
  };

  if (loading) return <div>Loading Auth State...</div>;

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm flex flex-col gap-4 max-w-md">
      <h2 className="text-xl font-bold">PathGuard Firebase Testing</h2>
      
      {!user ? (
        <button 
          onClick={handleSignIn}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={user.photoURL || ""} alt="Avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{user.displayName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <button 
            onClick={handleAddLog}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Trace Log to DB (Test Write)
          </button>
          
          <button 
            onClick={fetchLogs}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border hover:bg-gray-200 transition"
          >
            Fetch Recent Logs (Test Read)
          </button>

          {logs.length > 0 && (
            <div className="bg-slate-50 p-4 rounded text-sm text-gray-700 mt-2">
              <p className="font-bold mb-2">Recent Logs ({logs.length})</p>
              {logs.map(log => (
                <div key={log.id} className="border-b py-1 last:border-0 border-gray-200">
                  <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}:</span> {log.action}
                </div>
              ))}
            </div>
          )}

          <button 
            onClick={handleSignOut}
            className="mt-4 text-red-600 font-medium hover:underline text-left"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
