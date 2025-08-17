import { verifyCoinbaseSignature } from "../services/coinbaseService.js";

export const coinbaseWebhook = (req, res) => {
  const signature = req.headers["x-cc-webhook-signature"];
  const rawBody = req.rawBody;
  if (!verifyCoinbaseSignature(rawBody, signature)) {
    console.log("❌ Invalid Coinbase signature");
    return res.status(400).send("Invalid signature");
  }

  const event = req.body.event;
  console.log("✅ Webhook Event:", event.type);

  if (event.type === "charge:confirmed") {
    console.log("Payment confirmed!", event.data);
 
  }

  res.sendStatus(200);
};
