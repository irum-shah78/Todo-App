// // import { authOptions } from "@/libs/AuthOptions"
// // import { getServerSession } from "next-auth"
// import SignUp from "./(auth)/signup/page";
// // import LogoutButton from "@/components/logout/LogoutButton";
// // import AddListPage from "./todos/AddList";
// // import AddListPage from "./todos/AddList";

// export default async function HomePage(){
//   // const session = await getServerSession(authOptions);

//   // if (!session) {
//   //   return <AddListPage />;
//   // }

//   return (
//     <main>
//       {/* <div>Protected Dashboard, hello: {session?.user?.email} </div>
//       <div>Protected Dashboard, hello: {session?.user?.name} </div>
//       <div>Protected Dashboard, hello: {session?.user?.image} </div> */}
//        <SignUp />
//       {/* <AddListPage /> */}
     
//       {/* <LogoutButton /> */}
//     </main>
//   )
// }

import { authOptions } from "@/libs/AuthOptions"
import { getServerSession } from "next-auth"
import SignUp from "./(auth)/signup/page";

export default async function HomePage(){
  const session = await getServerSession(authOptions);

  return (
    <main>
      <SignUp />
    </main>
  )
}