const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./authRoutes');
const Line = require('./models/Line');  // Import the Line model here

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error: ", err));

// Use Auth Routes
app.use('/api/auth', authRoutes);

// CRUD Routes for Lines
app.post('/api/lines', async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Text field is required and cannot be empty' });
    }

    const line = new Line({ text });
    
    try {
        await line.save();
        res.status(201).json(line);
    } catch (error) {
        res.status(500).json({ message: 'Error adding line' });
    }
});

app.get('/api/lines', async (req, res) => {
    try {
        const lines = await Line.find();
        res.json(lines);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lines' });
    }
});

app.put('/api/lines/:id', async (req, res) => {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Text field is required and cannot be empty' });
    }
    
    try {
        const line = await Line.findById(req.params.id);

        if (!line) {
            return res.status(404).json({ message: 'Line not found' });
        }

        line.text = text;
        await line.save();
        res.json(line);
    } catch (error) {
        res.status(500).json({ message: 'Error editing line' });
    }
});

app.delete('/api/lines/:id', async (req, res) => {
    try {
        const line = await Line.findByIdAndDelete(req.params.id);

        if (!line) {
            return res.status(404).json({ message: 'Line not found' });
        }

        res.json({ message: 'Line deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting line' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
