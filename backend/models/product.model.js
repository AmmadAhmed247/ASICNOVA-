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
    PowerEfficiency: Number
}, { _id: false });

const detailedCharacteristicsSchema = new mongoose.Schema({
    inputVoltage: String,
    inputFrequency: String,
    maxCurrent: Number,
    NetworkConnectionMode: String,
    ServerSizeWithoutPackage: String,
    ServerSizeWithPackage: String,
    NetWeight: Number,
    GrossWeight: Number,
    Noise: Number,
    OperationTemperature: String,
    StorageTemperature: String,
    OperationHumidity: String,
    OperationAltitude: String
}, { _id: false });

const specificationsSchema = new mongoose.Schema({
    ProductGlance: productGlanceSchema,
    DetailedCharacteristics: detailedCharacteristicsSchema
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
    purchasingGuideLines: [String]
});

const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;
