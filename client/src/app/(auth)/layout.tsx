export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh grid place-content-center w-full p-6">
      {children}
    </div>
  );
}
