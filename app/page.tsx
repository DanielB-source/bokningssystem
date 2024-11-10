import Link from "next/link";
// import { generateRooms } from "./roomGenerator";

export default function Home() {
  // generateRooms();
  return (
    <div className="flex h-screen flex-col justify-between items-center ">
      <h1 className="text-9xl">Boka ett rum</h1>
      <Link href="/rooms" className="btn w-96 h-20 btn-neutral mb-10">
        Boka
      </Link>
    </div>
  );
}
