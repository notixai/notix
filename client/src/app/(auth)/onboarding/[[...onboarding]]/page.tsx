// import { useUser } from "@clerk/clerk-react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";

export const metadata = {
  title: "Onboarding",
  description: "Onboarding page",
};

async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-up");
  }
  const getUser = await fetchUser(user.id);

  if (getUser?.onboarded === true) redirect("/");

  const userData = {
    id: user.id || "",
    username: user.username || "",
    name: user.firstName || "",
    image: user.imageUrl || "",
    bio: "",
  };
  return (
    <main className="head-text mx-auto flex max-w-3xl flex-col justify-start px-10 py-12">
      <h1 className="font-bold text-3xl">Onboarding</h1>
      <p className="mt-3 text-base text-foreground">
        Complete your profile to get started with your new account to use
        Threads.
      </p>
      <section className="mt-9 bg-background p-5 rounded-lg">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
