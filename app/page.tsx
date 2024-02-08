import Image from "next/image";
import {config} from "@/components/Constants";
import Departments from "@/components/departments";
import {lusitana} from "@/app/ui/fonts";

export default async function Home() {
  return (
    <main className="p-10">
        <h1 className={`${lusitana.className} text-4xl text-center mb-10`}>Departments</h1>
      <Departments/>
    </main>
  );
}
