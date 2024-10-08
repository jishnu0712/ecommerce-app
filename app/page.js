
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <div className="mt-8">
        <Link href="/login" className="text-blue-500 underline">Login
        </Link>
      </div>
    </div>
  )
}
