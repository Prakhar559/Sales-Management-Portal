require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Models
const Opportunity = require('./models/Opportunity');
const Contact = require('./models/Contact');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Hoshō CRM: Data Engine Online"))
  .catch((err) => console.error("❌ Database Connection Interrupted", err));

// --- TERRITORY LOGIC ---
const TerritorySchema = new mongoose.Schema({
    regionName: { type: String, required: true },
    leadName: { type: String, required: true },
    status: { type: String, default: "Active" }
});
const Territory = mongoose.model('Territory', TerritorySchema);


let systemConfig = {
    allowAutomaticReminders: true,
    restrictDiscountApprovals: true,
    defaultTerritoryView: "Global"
};

// --- ROUTES ---

// Settings
app.get('/api/sales-management/settings', (req, res) => {
    res.status(200).json(systemConfig);
});

app.post('/api/sales-management/settings/update', (req, res) => {
    systemConfig = req.body;
    res.status(200).json({ message: "Configuration Vector Updated", systemConfig });
});

// Contacts
app.post('/api/sales-management/add-contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ error: "Failed to save contact" });
    }
});

app.get('/api/sales-management/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ name: 1 });
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: "Fetch failed" });
    }
});

app.post('/api/sales-management/add-deal', async (req, res) => {
  try {
    const dealEntry = new Opportunity(req.body);
    await dealEntry.save();
    res.status(201).json(dealEntry);
  } catch (err) {
    res.status(500).json({ error: 'Database saving failed' });
  }
});

app.get('/api/sales-management/pipeline', async (req, res) => {
    try {
        const pipelineData = await Opportunity.find().sort({ createdAt: -1 });
        res.status(200).json(pipelineData);
    } catch (error) {
        res.status(500).json({ message: "Sync Error" });
    }
});

app.delete('/api/sales-management/remove/:id', async (req, res) => {
    try {
        await Opportunity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Purged" });
    } catch (err) {
        res.status(500).json({ error: "Failed" });
    }
});

app.patch('/api/sales-management/approve-discount/:id', async (req, res) => {
    try {
        const deal = await Opportunity.findByIdAndUpdate(req.params.id, { isDiscountApproved: true }, { new: true });
        res.status(200).json(deal);
    } catch (err) {
        res.status(500).json({ error: "Approval failed" });
    }
});

// Territories
app.post('/api/sales-management/add-territory', async (req, res) => {
    try {
        const territory = new Territory(req.body);
        await territory.save();
        res.status(201).json(territory);
    } catch (err) {
        res.status(500).json({ error: "Territory assignment failed" });
    }
});

app.get('/api/sales-management/territories', async (req, res) => {
    try {
        const data = await Territory.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Fetch failed" });
    }
});

const PORT = 5001; 
app.listen(PORT, () => {
  console.log(`🚀 Sales Management Engine running on http://localhost:${PORT}`);
});