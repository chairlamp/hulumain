const AboutPage = () => {
  return (
    <main className="max-w-5xl mx-auto p-8 space-y-10 bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 rounded-2xl shadow-2xl mt-10 mb-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-black drop-shadow-sm">About Us</h1>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Welcome to our food delivery platform – your go-to destination for discovering delicious meals from local
          restaurants, delivered right to your door.
        </p>
      </div>

      <section className="space-y-4 bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md border border-orange-200">
        <h2 className="text-3xl font-semibold text-black">🍽 Our Mission</h2>
        <p className="text-black text-lg">
          We're here to make great food more accessible. Whether you’re craving comfort food or trying something new, we
          connect you with a variety of restaurants and cuisines through a seamless online experience.
        </p>
      </section>

      <section className="space-y-4 bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md border border-orange-200">
        <h2 className="text-3xl font-semibold text-black">💡 Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2 text-black text-lg">
          <li>Curated selection of top-rated local restaurants</li>
          <li>Fast, reliable delivery from our dedicated agents</li>
          <li>Personalized recommendations and search tools</li>
          <li>Secure payment and real-time order tracking</li>
        </ul>
      </section>

      <section className="space-y-4 bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md border border-orange-200">
        <h2 className="text-3xl font-semibold text-black">🤝 Join Our Community</h2>
        <p className="text-black text-lg">
          Whether you’re a customer, a restaurant partner, or a delivery agent, we’re excited to have you on board.
          Together, we’re building a vibrant food ecosystem that supports local businesses and delivers joy to your
          table.
        </p>
      </section>
    </main>
  )
}

export default AboutPage
