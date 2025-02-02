export default function Page() {
  return (
    <main className="head-text mx-auto flex max-w-3xl flex-col justify-start px-4 py-12">
      <h1 className="font-bold text-3xl">Onboarding</h1>
      <p className="mt-3 text-base text-foreground">
        Complete your profile to get started with your new account to use
        Threads.
      </p>
      <section className="mt-9 bg-background p-5 rounded-lg">
        {/* <AccountProfile user={userData} btnTitle="Continue" /> */}
      </section>
    </main>
  );
}
