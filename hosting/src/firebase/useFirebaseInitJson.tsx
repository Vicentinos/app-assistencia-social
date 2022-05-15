import { useEffect, useState } from "react";

export function useFirebaseInitJson() {
  const [initJson, setInitJson] = useState();
  useEffect(() => {
    const abortController = new AbortController();
    fetch("./__/firebase/init.json", { signal: abortController.signal })
      .then((res) => {
        res.json().then((json) => {
          setInitJson(json);
        });
      })
      .catch();
    return () => {
      abortController.abort();
    };
  }, []);
  return initJson;
}
