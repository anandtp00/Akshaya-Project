const mongoose = require('mongoose');

//schema creation with required fields
var IncomeSchema = mongoose.Schema({
    company: { type: String, required: true },
    service: { type: String, required: true },
    bankcharge: {
        type: Number,
        default: 0
    },
    servicecharge: { type: Number, default: 0, required: true },
    bankservicecharge: { type: Number, default: 0 },
    date: { type: Date, required: true },
    totalincome: { type: Number, required: true },
    key: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Income', IncomeSchema);