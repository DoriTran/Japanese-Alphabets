import { useLayoutEffect, useState } from "react";

export default function useWindowSizeEffect(callback: () => any): any {
  const [result, setResult] = useState<any>(null);
  useLayoutEffect(() => {
    function updateSize(): void {
      setResult(callback());
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [callback]);

  return result;
}
