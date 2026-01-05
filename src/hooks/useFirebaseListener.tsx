import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../lib/firebase'; // Adjust this path to your firebase config file

export const useFirebaseListener = (lang = 'ar') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Construct the path dynamically: elnemr123/CAPA/ar or en
    const dbRef = ref(database, `elnemr123/CAPA/${lang}`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      try {
        const val = snapshot.val();
        setData(val);
        setLoading(false);
      } catch (err:any) {
        setError(err.message);
        setLoading(false);
      }
    }, (err:any) => {
      setError(err.message);
      setLoading(false);
    });

    // Cleanup: Remove listener when component unmounts
    return () => unsubscribe();
  }, [lang]);

  return { data, loading, error };
};