const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  perUnit: Number,
  perGram: Number
}, { _id: false });

const productGlanceSchema = new mongoose.Schema({
  modelName: String,
  hashRate: String,
  powerConsumption: String,
  algorithm: String,
  phase: String,
  maxCurrent: String,
  inputVoltage: String,
  inputFrequency: String
}, { _id: false });

const hardwareConfigurationSchema = new mongoose.Schema({
  networkConnectionMode: String,
  serverSizeWithoutPackage: String,
  serverSizeWithPackage: String,
  netWeight: String,
  grossWeight: String
}, { _id: false });

const environmentRequirementsSchema = new mongoose.Schema({
  siteCoolantTemperature: String,
  coolantFlow: String,
  coolantPressure: String,
  workingCoolant: String,
  diameterOfCoolantPipeConnector: String
}, { _id: false });

const specificationsSchema = new mongoose.Schema({
  ProductGlance: productGlanceSchema,
  HardwareConfiguration: hardwareConfigurationSchema,
  EnvironmentRequirements: environmentRequirementsSchema
}, { _id: false });

const customerReviewSchema = new mongoose.Schema({
  name: String,
  review: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  functionType: String,
  shippingDate: Date,
  paymentMethod: [{ type: String }],
  price: priceSchema,
  images: [String],
  specifications: specificationsSchema,
  customerReviews: [customerReviewSchema],
  purchasingGuidelines: [String],
  notes: [String],
  stock: { type: Number },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Out Of Stock']
  },

  // Your static or per-product receiving addresses
  cryptoAddresses: {
    BTC: { type: String, required: true },
    ETH: { type: String, required: true }
  },

  // Optional legacy field (not required since we now calculate dynamically)
  expectedAmounts: {
    BTC: { type: mongoose.Schema.Types.Decimal128, min: 0.0001 },
    ETH: { type: mongoose.Schema.Types.Decimal128, min: 0.001 }
  }
});

module.exports = mongoose.model('Product', productSchema);
