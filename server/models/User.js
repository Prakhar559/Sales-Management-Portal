const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    role: { 
        type: String, 
        enum: [
            'Sales Representative', 
            'Sales Manager', 
            'Account Manager', 
            'Marketing Team', 
            'Product Manager', 
            'Executive'
        ],
        default: 'Sales Representative' 
    },
    territory: { type: String, default: 'General' } 
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);