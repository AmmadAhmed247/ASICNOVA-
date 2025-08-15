const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
    perUnit: Number,
    perGram: Number
}, { _id: false });

const productGlanceSchema = new mongoose.Schema({
    modelName: String,
    Algorithm: String,
    typicalHashRate: Number,
    PowerOnWall: Number,
    PowerEfficiency: Number,
    PowerSupply: {
        Phase: Number,
        inputVoltage: String,
        inputFrequency: String,
        maxCurrent: String
    }
}, { _id: false });

const hardwareConfigurationSchema = new mongoose.Schema({
    NetworkConnectionMode: String,
    ServerSizeWithoutPackage: String,
    ServerSizeWithPackage: String,
    NetWeight: Number,
    GrossWeight: Number
}, { _id: false });

const environmentRequirementsSchema = new mongoose.Schema({
    SiteCoolantTemperature: String,
    CoolantFlow: String,
    CoolantPressure: String,
    WorkingCoolant: String,
    DiameterOfCoolantPipeConnector: String
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
    type: {
        type: String,
        enum: ['SPOT', 'FUTURES'],
        default: null
    },
    shippingDate: Date,
    paymentMethod: [{
        type: String,
        enum: ['USD', 'LTC', 'BTC', 'ETC']
    }],
    price: priceSchema,
    images: [String],
    specifications: specificationsSchema,
    customerReviews: [customerReviewSchema],
    purchasingGuideLines: [String],
    notes: [String]
});

const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;

