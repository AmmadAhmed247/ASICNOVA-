import crypto from "crypto"

export const verifyCoinbaseSignature = (rawBody, signature) => {
  const hmac = crypto
    .createHmac("sha256", process.env.COINBASE_WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("hex");

  return signature === hmac;
};
