const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = { connect };
