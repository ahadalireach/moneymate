import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../config/firebase";

const useFetchData = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName) return;

    try {
      const collectionRef = collection(firestore, collectionName);
      const q = query(collectionRef, ...constraints);

      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const fetchedData = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as T[];
          setData(fetchedData);
          setIsLoading(false);
        },
        (err) => {
          console.log("Error fetching data:", err);
          setError(err.message);
          setIsLoading(false);
        }
      );

      return () => {
        unsub();
      };
    } catch (error: any) {
      console.log("Query error:", error);
      setData([]);
      setIsLoading(false);
      setError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return { data, isLoading, error };
};

export default useFetchData;
