import { useLayoutEffect, useState } from "react";

export const useElementHeight = () => {
  const [elementRef, setElementRef] = useState<null | HTMLElement>(null);
  const [elementHeight, setElementHeight] = useState(0);
  useLayoutEffect(() => {
    setElementHeight(elementRef?.clientHeight || 0);
  }, [elementRef]);
  return { setElementRef, elementHeight };
};
