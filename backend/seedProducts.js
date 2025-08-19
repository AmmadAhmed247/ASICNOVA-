const mongoose = require("mongoose");
const Product = require("./models/product.model");
require("dotenv").config();

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

const seedProducts = async () => {
  await ConnectToDB();

  // Clear existing products (optional)
  await Product.deleteMany({});

  // Mock products
  const products = [
    {
      name: "Product 1",
      functionType: "Mining",
      paymentMethod: ["BTC", "ETH"],
      price: { perUnit: 100, perGram: 10 },
      cryptoAddresses: { BTC: "mock_btc_address_1", ETH: "mock_eth_address_1" },
      expectedAmounts: { BTC: 0.001, ETH: 0.02 },
      stock: 10,
      status: "Active"
    },
    {
      name: "Product 2",
      functionType: "Mining",
      paymentMethod: ["BTC", "ETH"],
      price: { perUnit: 200, perGram: 20 },
      cryptoAddresses: { BTC: "mock_btc_address_2", ETH: "mock_eth_address_2" },
      expectedAmounts: { BTC: 0.002, ETH: 0.03 },
      stock: 5,
      status: "Active"
    }
  ];

  try {
    const created = await Product.insertMany(products);
    console.log("Seeded products:", created);
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedProducts();
