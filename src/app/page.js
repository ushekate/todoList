import Image from "next/image";
// import AddTask from "@/components/AddTask";
// import LoginPage from "@/components/login";
// import AddTask from "./todo/page";
import Login from "./login/page";
import './globals.css';


export default function Home() {
    return (

        <div className="home bg-gray-800 items-center justify-items-center min-h-screen   font-[family-name:var(--font-geist-sans)]">
            <Login />
        </div>

    );
}
