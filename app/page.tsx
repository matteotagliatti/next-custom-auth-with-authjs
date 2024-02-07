import { auth, signIn, signOut } from "@/auth";

function SignIn() {
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

function SignOut({ children }: { children: React.ReactNode }) {
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
    <section className="max-w-3xl mx-auto p-4">
      <h1>Home</h1>
      <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
    </section>
  );
}
