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
    paymentMethod: [{
        type: String,
        enum: ['USD', 'LTC', 'BTC', 'ETH']
    }],
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
    // cryptoAddresses: {
    //     BTC: { type: String, required: true },
    //     ETH: { type: String, required: true },

    // },
    // expectedAmounts: {
    //     BTC: { type: Number, required: true },
    //     ETH: { type: Number, required: true },

    // }
});

const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;
