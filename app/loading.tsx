// app/page.tsx

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 10000)) // simulate slow loading

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-orange-200 to-pink-300 flex items-center justify-center text-center">
      <div className="text-white font-semibold space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Welcome to Kech</h1>
        <p className="text-xl md:text-2xl text-gray-800">Your food, your way. Fresh, fast, and ready to go!</p>
        <div className="mt-6 animate-pulse text-lg">
          <span>Loading...</span>
        </div>
      </div>
    </div>
  )
}
