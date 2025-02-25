const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Line = require('./models/Line');  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies or authentication headers
};

app.use(cors(corsOptions));
app.use(express.json());

// CRUD Routes for Lines
app.post('/api/lines', async (req, res) => {
    const { text, pageName } = req.body;

    try {
        const newLine = new Line({ text, pageName });
        await newLine.save();
        res.status(201).json({ message: 'Line added successfully' });
    } catch (error) {
        console.error('Error saving line:', error);  // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



app.get('/api/lines', async (req, res) => {
    const { pageName  } = req.query;  
    if (!pageName) {
        return res.status(400).json({ message: 'Page parameter is required' });
    }

    try {
        const lines = await Line.find({ pageName }).sort({ createdAt: 1 });
        res.status(200).json(lines);
    } catch (error) {
        console.error('Error fetching lines:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



// app.put('/api/lines/:id', async (req, res) => {
//     const { text, page } = req.body;
    
//     if (!text || text.trim() === '' || !page) {
//         return res.status(400).json({ message: 'Text and page fields are required' });
//     }
    
//     try {
//         const line = await Line.findById(req.params.id);

//         if (!line) {
//             return res.status(404).json({ message: 'Line not found' });
//         }

//         line.text = text;
//         line.page = page; 
//         await line.save();
//         res.json(line);
//     } catch (error) {
//         res.status(500).json({ message: 'Error editing line' });
//     }
// });



// app.delete('/api/lines/:id', async (req, res) => {
//     try {
//         const line = await Line.findByIdAndDelete(req.params.id);

//         if (!line) {
//             return res.status(404).json({ message: 'Line not found' });
//         }

//         res.json({ message: 'Line deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting line' });
//     }
// });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error: ", err));



