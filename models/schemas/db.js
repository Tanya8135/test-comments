
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
    console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
    console.log(`Database connection error db: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Database connection disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Database connection closed and app terminated');
    process.exit(1);
});

export default db