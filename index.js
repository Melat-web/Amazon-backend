// const functions = require("firebase-functions");
// const logger = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OPW8pGTQ27kNoi6evItlf25eLg8AoAoYLhP20jgcYSqtQYJX6CvAoAASa4PrlRI6q5ZsEU1g2ycjnAIFyz3fOa1009vBIu5O8"
);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
//listen for requests from firebase
app.get("/", (req, res) => {
  res.status(200).send("Hello test for Amazon");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request received:", total);

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(400).send({
      message: "Payment failed",
    });
  }
});
app.listen(5001, console.log("Amazon server running on port : 5001"));
// exports.api = functions.https.onRequest(app);
