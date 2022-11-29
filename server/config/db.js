const mongoose = require('mongoose');


const connectDatabase = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO);
        console.log(`MongoDB connected: ${result.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error: ${error.message}`.bgRed.white);
    }
    
}

module.exports = connectDatabase;
