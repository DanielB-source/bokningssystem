import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-between items-center px-4">
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-6xl md:text-7xl lg:text-9xl text-center">
          Boka ett rum
        </h1>
      </div>
      <div className="w-full flex justify-center mb-10">
        <Link
          href="/rooms"
          className="btn w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-16 sm:h-20 btn-neutral rounded-lg"
        >
          Boka
        </Link>
      </div>
    </div>
  );
}
