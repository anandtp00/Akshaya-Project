const mongoose = require('mongoose');

//schema creation with required fields
var StatementSchema = mongoose.Schema({
    company: { type: String, required: true },
    transactiondetails: { type: String, required: true },
    income: {
        type: Number
    },
    expense: {
        type: Number
    },
    date: { type: Date, required: true },
    key: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Statement', StatementSchema);