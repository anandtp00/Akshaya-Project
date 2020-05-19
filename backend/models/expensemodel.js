const mongoose = require('mongoose');

//schema creation with required fields
var ExpenseSchema = mongoose.Schema({
    company: { type: String, required: true },
    expensereason: { type: String, required: true },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    date: { type: Date, required: true },
    key: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);