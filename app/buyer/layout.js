import Navbar from "@/components/Navbar";

export default function BuyerLayout({ children }) {
    return (
      <div className="min-h-screen flex flex-col items-center">
      <header className="w-full">
        <Navbar user="buyer"/>
      </header>
      <main className="flex-1 w-full max-w-4xl p-4">{children}</main>
    </div>
    )
  }
  