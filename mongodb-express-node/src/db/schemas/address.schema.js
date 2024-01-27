import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    country: String,
});

export default AddressSchema;