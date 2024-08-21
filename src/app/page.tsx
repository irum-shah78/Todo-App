import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUp from "./(auth)/signup/page";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/todos/todo');
  }

  return (
    <main>
      <SignUp />
    </main>
  );
}
