const router = require("express").Router();
const Product = require("../models/Product.model");
const Transaction = require("../models/Transaction.model");

// This is a sample test API key.
const stripe = require("stripe")(
  "sk_test_51K0OW2JUf2t563ByXecoDCXqjr478pH76g76nTutvm186wCpZV75Z8wker5evZzW74V8WjWy1dWPIKWbmW4lUeGP00UgcZoM6J"
);

/* const calculateOrderAmount = (items) => {
  console.log(items);
  // Replace this constant with a calculation of the order's amount
  Product.findById(items[0]._id)
    .then((product) => {
      return product.price * 100;
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
}; */

router.post("/create-payment-intent", (req, res) => {
  const { items } = req.body;

  Product.findById(items[0]._id)
    .then(async (product) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: product.price * 100,
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

      Transaction.create({
        seller: product.addedBy,
        buyer: req.session.user._id,
        price: product.price,
        product: product._id,
      })
        .then((newTransaction) => {
          console.log(newTransaction);
          res.send({
            clientSecret: paymentIntent.client_secret,
            newTransaction: newTransaction._id,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
  // Create a PaymentIntent with the order amount and currency
});

//We need to create a route to change the isApproved to true

router.patch("/transaction-complete/:id", (req, res, next) => {
  const { id } = req.params;
  Transaction.findByIdAndUpdate(id, { isApproved: true }, { new: true })
    .then((approvedTrans) => {
      res.status(200).json({ approvedTrans });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

/* router.get("/order/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.send(
    `<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`
  );
}); */

module.exports = router;
