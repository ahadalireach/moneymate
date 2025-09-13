import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import { firestore } from "../config/firebase";

const useFetchData = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedConstraints = useMemo(
    () => constraints,
    [JSON.stringify(constraints)]
  );

  useEffect(() => {
    if (!collectionName) {
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const collectionRef = collection(firestore, collectionName);
      const q = query(collectionRef, ...memoizedConstraints);

      const unsub = onSnapshot(
        q,
        (snapshot) => {
          try {
            const fetchedData = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            }) as T[];
            setData(fetchedData);
            setIsLoading(false);
          } catch (mappingError: any) {
            console.error("Error mapping document data:", mappingError);
            setError("Failed to process data");
            setIsLoading(false);
          }
        },
        (err) => {
          console.error("Error fetching data:", err);
          setError(err.message || "Failed to fetch data");
          setIsLoading(false);
        }
      );

      return () => {
        unsub();
      };
    } catch (setupError: any) {
      console.error("Error setting up data listener:", setupError);
      setError(setupError.message || "Failed to setup data listener");
      setIsLoading(false);
    }
  }, [collectionName, memoizedConstraints]);

  return { data, isLoading, error };
};

export default useFetchData;
