import { getServerSession } from "next-auth";
import { authOption } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {

    const session = await getServerSession(authOption)

    if(!session){
        redirect("/login")
    }

    return(
    <div>
      <h1>Home</h1>
      <p>Welcome {session.user?.email}</p>
    </div>
    );
}