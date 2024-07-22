// import { authOptions } from "@/libs/AuthOptions"
// import { getServerSession } from "next-auth"
// import { redirect } from "next/navigation";

// interface ProtectedRootLayoutProps {
//   children: React.ReactNode
// }

// export default async function ProtectedRootLayout({
//   children
// }: ProtectedRootLayoutProps){
//   const session = await getServerSession(authOptions);

//   if(!session?.user?.email){
//     redirect("/signup");
//   }
//   return (
//    <main>
//     {children}
//    </main>
//   )
// }


// src/app/(root)/layout.tsx
import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ProtectedRootLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedRootLayout({
  children,
}: ProtectedRootLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  return <>{children}</>;
}
