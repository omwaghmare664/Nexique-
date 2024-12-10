const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${process.env.MONGO_URI}`);
<<<<<<< HEAD
=======

        // Wait until the connection is established
        mongoose.connection.once('connected', async () => {
            try {
                const indexes = await mongoose.connection.db.collection('products').indexes();
                console.log('Indexes:', indexes);
            } catch (err) {
                console.error('Error fetching indexes:', err);
            }
        });
>>>>>>> b89d5ca (Initial commit)
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
<<<<<<< HEAD
}
=======
};
>>>>>>> b89d5ca (Initial commit)

module.exports = connectDB;
