
"use client";

export default function Home() {
  const subscribe = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: "price_1Sk1gCPt5vkl9Phx5Eqtm2HB", // من Stripe Dashboard
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Stripe Test Subscription</h1>
      <button onClick={subscribe}>Subscribe</button>
    </main>
  );
}
