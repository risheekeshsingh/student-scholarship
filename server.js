require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

const itemRoutes = require('./routes/itemRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const chatRoutes = require('./routes/chatRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const fellowshipRoutes = require('./routes/fellowshipRoutes');
const officerRoutes = require('./routes/officerRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const alertRoutes = require('./routes/alertRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { startScheduler } = require('./utils/scheduler');
const Scholarship = require('./models/Scholarship');
const Institution = require('./models/Institution');
const Fellowship = require('./models/Fellowship');
const Officer = require('./models/Officer');

// Start the background cron jobs
startScheduler();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Connect to MongoDB In-Memory database for guaranteed Hackathon Demo functionality!
const connectDB = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const MONGODB_URI = mongoServer.getUri();

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Memory Server successfully!');

    // Automatically Seed Data for the Demo!
    const dataPath = path.join(__dirname, 'data', 'scholarships.json');
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath);
      const scholarshipsData = JSON.parse(rawData);
      
      const count = await Scholarship.countDocuments();
      if (count === 0) {
        await Scholarship.insertMany(scholarshipsData);
        console.log(`✅ Seeded ${scholarshipsData.length} Sample Indian Scholarships perfectly!`);
      }
    }

    const instPath = path.join(__dirname, 'data', 'institutions_2025_nirf.json');
    if (fs.existsSync(instPath)) {
      const rawInst = fs.readFileSync(instPath);
      const instDataFile = JSON.parse(rawInst);
      let instData = instDataFile.institutions || instDataFile;
      
      // Transform the data to add placementPercentage as numeric value
      instData = instData.map(inst => {
        let placementPercentage = 85; // Default fallback
        
        // Try to extract from placement.placementRate
        if (inst.placement?.placementRate) {
          const parsed = parseInt(inst.placement.placementRate);
          if (!isNaN(parsed)) {
            placementPercentage = parsed;
          }
        }
        // Otherwise try placementPercentage field
        else if (inst.placementPercentage && !isNaN(inst.placementPercentage)) {
          placementPercentage = inst.placementPercentage;
        }

        // Handle location object to string conversion
        let locationStr = inst.location;
        let stateStr = inst.state;
        if (typeof inst.location === 'object' && inst.location !== null) {
          locationStr = inst.location.city || '';
          stateStr = inst.location.state || inst.state;
        }
        
        // Mock degrees based on category
        let degrees = ["B.Tech", "M.Tech", "Ph.D"];
        const cat = String(inst.category || '').toLowerCase();
        if (cat.includes('overall'))     degrees = ["B.Tech", "MBA", "Ph.D", "B.Sc"];
        if (cat.includes('management'))  degrees = ["MBA", "Executive MBA", "Post Graduate Diploma"];
        if (cat.includes('medical'))     degrees = ["MBBS", "MD", "MS", "B.Sc (Nursing)"];
        if (cat.includes('law'))         degrees = ["BA LLB", "BBA LLB", "LLM"];
        if (cat.includes('college'))     degrees = ["BA", "B.Sc", "B.Com", "MA"];
        if (cat.includes('agriculture')) degrees = ["B.Sc (Agri)", "M.Sc (Agri)", "MBA (Agri)"];

        return {
          ...inst,
          location: locationStr,
          state: stateStr,
          placementPercentage: placementPercentage,
          nirfRanking: inst.rank || 0,
          degrees: degrees,
          statistics: {
            world: (inst.rank || 0) * 10 + Math.floor(Math.random() * 50) + 100,
            asia: (inst.rank || 0) * 5 + Math.floor(Math.random() * 20) + 50,
            india: inst.rank || 0,
            state: Math.floor(Math.random() * 10) + 1
          }
        };
      });
      
      const InstCount = await Institution.countDocuments();
      if (InstCount === 0) {
        await Institution.insertMany(instData);
        console.log(`✅ Seeded ${instData.length} Top Institutions from NIRF 2025 perfectly!`);
      }
    }

    const fellPath = path.join(__dirname, 'data', 'fellowships.json');
    if (fs.existsSync(fellPath)) {
      const rawFell = fs.readFileSync(fellPath);
      const fellData = JSON.parse(rawFell);
      
      const FellCount = await Fellowship.countDocuments();
      if (FellCount === 0) {
        await Fellowship.insertMany(fellData);
        console.log(`✅ Seeded ${fellData.length} Research Fellowships perfectly!`);
      }
    }

    const offPath = path.join(__dirname, 'data', 'officers.json');
    if (fs.existsSync(offPath)) {
      const rawOff = fs.readFileSync(offPath);
      const offData = JSON.parse(rawOff);
      
      const offCount = await Officer.countDocuments();
      if (offCount === 0) {
        await Officer.insertMany(offData);
        console.log(`✅ Seeded ${offData.length} Nodal Officers perfectly!`);
      }
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

connectDB();

// Routes configuration
app.use('/api/items', itemRoutes);
app.use('/api', scholarshipRoutes);
app.use('/api', chatRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/fellowships', fellowshipRoutes);
app.use('/api/officers', officerRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/v1', uploadRoutes);

// A simple root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the EduGrant Node.js backend API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running flawlessly on http://localhost:${PORT}`);
});
