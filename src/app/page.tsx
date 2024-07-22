import { authOptions } from "@/libs/AuthOptions"
import { getServerSession } from "next-auth"
import SignUp from "./(auth)/signup/page";
import LogoutButton from "@/components/logout/LogoutButton";

export default async function HomePage(){
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignUp />;
  }

  return (
    <main>
      <div>Protected Dashboard, hello: {session?.user?.email} </div>
      <div>Protected Dashboard, hello: {session?.user?.name} </div>
      <div>Protected Dashboard, hello: {session?.user?.image} </div>
      <LogoutButton />
    </main>
  )
}
