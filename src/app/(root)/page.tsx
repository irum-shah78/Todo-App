import LogoutButton from "@/components/logout/LogoutButton";
import { authOptions } from "@/libs/AuthOptions"
import { getServerSession } from "next-auth"

export default async function HomePage(){
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div>Protected Dashboard, hello: {session?.user?.email} </div>
      <LogoutButton />
    </main>
  )
}