const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// Creates a Stripe Checkout session and returns the URL
exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") return res.status(405).send("Method not allowed");

    const { priceId, userEmail } = req.body;
    if (!priceId || !userEmail) return res.status(400).send("Missing priceId or userEmail");

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: priceId.includes("lifetime") ? "payment" : "subscription",
        customer_email: userEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.CLIENT_URL}/generator?payment=success`,
        cancel_url: `${process.env.CLIENT_URL}/pricing?payment=cancelled`,
        metadata: { userEmail },
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error("Stripe error:", err);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });
});

// Stripe webhook — marks user as Pro after successful payment
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "invoice.payment_succeeded"
  ) {
    const session = event.data.object;
    const userEmail = session.customer_email || session.metadata?.userEmail;

    if (userEmail) {
      // Find the user by email and mark them as Pro
      const snapshot = await db
        .collection("users")
        .where("email", "==", userEmail)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        await snapshot.docs[0].ref.update({
          isPro: true,
          proSince: admin.firestore.FieldValue.serverTimestamp(),
          stripeSessionId: session.id,
        });
        console.log(`Upgraded ${userEmail} to Pro`);
      }
    }
  }

  res.json({ received: true });
});
