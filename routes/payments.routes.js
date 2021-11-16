const router = require("express").Router();

// This is a sample test API key.
const stripe = require("stripe")(
  "sk_test_51JwX9tHrox29DJreX5C3H8x4L5YiK1cDBaskLA8UZPQ5lPlFCEha3M9B0fQ0hX1pSEUbcb9m6kykvZRoRRsesxtn00UpocWRcH"
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    payment_method_types: [
      "giropay",
      "eps",
      "p24",
      "sofort",
      "sepa_debit",
      "card",
      "bancontact",
      "ideal",
    ],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
