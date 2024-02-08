"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const UpdateForm = () => {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name ?? "");

  if (!session?.user) return null;
  return (
    <>
      <h2>Updating the session</h2>
      <form
        onSubmit={async () => {
          if (session) {
            const newSession = await update({
              ...session,
              user: { ...session.user, name },
            });
            console.log({ newSession });
          }
        }}
        className="flex items-center w-full max-w-sm space-x-2"
      >
        <input
          type="text"
          placeholder={session.user.name ?? ""}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default function ClientExample() {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Session Data</h2>
          <pre className="text-white p-4 bg-black rounded">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
      <UpdateForm />
    </div>
  );
}
