import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

export const createCheckOutSession = async (price) => {
  const stripe = await stripePromise;
  const checkoutSession = await axios.post("/api/create-stripe-session", {
    price,
  });

  const result = await stripe.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });

  return result;
};
