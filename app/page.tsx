import { auth, signIn, signOut } from "@/auth";
import ApiExample from "@/components/api-example";
import ClientExample from "@/components/client-example";
import { SessionProvider } from "next-auth/react";

function SignInServer() {
  return (
    <form
      className="border border-blue-500 p-4 rounded-md bg-blue-100"
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <p>You are not logged in</p>
      <button
        className="border border-black py-1 px-2 rounded hover:bg-neutral-200"
        type="submit"
      >
        Sign in with GitHub
      </button>
    </form>
  );
}

function SignOutServer({ children }: { children: React.ReactNode }) {
  return (
    <form
      className="border border-red-500 p-4 rounded-md bg-red-100"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button
        className="border border-black py-1 px-2 rounded hover:bg-neutral-200"
        type="submit"
      >
        Sign out
      </button>
    </form>
  );
}

export default async function Page() {
  let session = await auth();
  let user = session?.user?.email;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <section>
        <h1>Server</h1>
        <div>
          {user ? (
            <SignOutServer>{`Welcome ${user}`}</SignOutServer>
          ) : (
            <SignInServer />
          )}
        </div>
      </section>
      <section>
        <h1>Client</h1>
        <SessionProvider session={session}>
          <ClientExample />
        </SessionProvider>
      </section>
      <section>
        <h1>Protected API</h1>
        <ApiExample />
      </section>
    </div>
  );
}
