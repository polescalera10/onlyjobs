const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { price } = req.body;

  const redirectURL = req.headers.origin;

  const transformedItem = {
    price_data: {
      currency: "eur",
      product_data: {
        name: "Publicar oferta",
        description: `Publicar oferta en OnlyJobsBoard.com`,
      },
      unit_amount: price * 100,
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
