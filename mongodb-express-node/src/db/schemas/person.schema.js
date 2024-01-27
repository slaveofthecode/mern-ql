import mongoose from 'mongoose';
import AddressSchema from './address.schema.js';


const PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: { type: String, enum: ["FEMALE", "MALE"], required: true },
    createdAd: { type: Date, default: Date.now },
    phoneNumber: String,
    email: String,
    address: AddressSchema
});

export default PersonSchema