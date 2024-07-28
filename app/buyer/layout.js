
export default function BuyerLayout({ children }) {
    return (
      <div className="min-h-screen flex flex-col items-center">
        <header className="w-full bg-gray-800 text-white p-4 text-center">
          <h1 className="text-2xl">Buyer Dashboard</h1>
        </header>
        <main className="flex-1 w-full max-w-4xl p-4">{children}</main>
      </div>
    )
  }
  