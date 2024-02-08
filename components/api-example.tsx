"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/protected");
      const json = await res.json();
      setData(json);
    })();
  }, []);
  return (
    <pre>
      <pre className="text-white p-4 bg-black rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </pre>
  );
}
