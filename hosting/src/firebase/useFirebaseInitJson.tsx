import { useEffect, useState } from "react";

export function useFirebaseInitJson() {
  const [initJson, setInitJson] = useState();
  useEffect(() => {
    const abortController = new AbortController();
    console.info("fetching init.json");
    fetch("./__/firebase/init.json", { signal: abortController.signal })
      .then((res) => {
        res.json().then((json) => {
          console.info("fetched init.json");
          setInitJson(json);
        });
      })
      .catch(() => {
        console.info("fetch of init.json was aborted");
      });
    return () => {
      console.info("aborting fetch of init.json");
      abortController.abort();
    };
  }, []);
  return initJson;
}
