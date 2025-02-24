const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    page: {
        type: String,  // Define 'page' as a string field
        required: true  // Make sure it's required
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Automatically set updatedAt when a line is updated
lineSchema.pre('save', function(next) {
    if (this.isModified('text')) {
        this.updatedAt = Date.now();
    }
    next();
});

// Export the model correctly
const Line = mongoose.model('Line', lineSchema);
module.exports = Line;
