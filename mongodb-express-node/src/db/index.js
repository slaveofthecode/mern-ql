import mongoose from 'mongoose';

const connnectToDB = async () => {

    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DB_NAME,
        retryWrites: true,
        w: 'majority'
    });

}

mongoose.connection.on('connected', () => { console.log('DB is connected') });
mongoose.connection.on('error', (err) => { 
    console.log('There was an error in the connection to DB :' , err) 
});
 
export default connnectToDB;