const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    salesTarget: { type: Number, default: 100000 }, 
    region: { type: String, default: 'Asia-Pacific' }, 
    currencyPreference: { type: String, default: 'USD' },
    notificationsEnabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);