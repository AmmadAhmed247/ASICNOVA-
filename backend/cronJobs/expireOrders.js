const cron = require("node-cron");
const Order = require("../models/order.model");

cron.schedule("* * * * *", async () => { // every minute
  try {
    const now = new Date();
    const expired = await Order.updateMany(
      { status: "AWAITING_PAYMENT", quoteExpiresAt: { $lt: now } },
      { status: "REJECTED" }
    );
    if (expired.modifiedCount > 0) {
      console.log(`${expired.modifiedCount} orders expired automatically.`);
    }
  } catch (err) {
    console.error("Error expiring orders:", err);
  }
});
