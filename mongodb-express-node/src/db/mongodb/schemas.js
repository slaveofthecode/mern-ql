import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AddresSchema = new Schema({
    street: String,
    city: String,
    country: String,
});

const PersonSchem = new Schema({
    name: String,
    age: Number,
    gender: { type: String, enum: ["FEMALE", "MALE"], required: true },
    createdAd: { type: Date, default: Date.now },
    phoneNumber: String,
    email: String,
    address: AddresSchema
});

const Person = mongoose.model('Person', PersonSchem, 'Persons');

export default Person;