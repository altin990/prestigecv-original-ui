export const STRIPE_PLANS = {
  pro: {
    name: "Pro",
    price: "$9/month",
    priceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID,
    features: ["Unlimited resumes", "All templates", "PDF export", "Priority support"],
  },
  lifetime: {
    name: "Lifetime",
    price: "$49 once",
    priceId: import.meta.env.VITE_STRIPE_LIFETIME_PRICE_ID,
    features: ["Everything in Pro", "Lifetime access", "Future templates included"],
  },
};

export async function createCheckoutSession(priceId: string, userEmail: string): Promise<void> {
  const res = await fetch(
    `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/createCheckoutSession`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, userEmail }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create checkout session");
  }

  const { url } = await res.json();
  window.location.href = url;
}
