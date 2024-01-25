import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const server = express();

server.use(express.json());

// MONGODB
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
// --- MONGODB

// CONTROLLER
const controller = {
    get : async (req, res, next) => {
    
        try {    
            const persons = await Person.find();
            res.json(persons);
        } catch (error) {
            res.json({ message: error.message });
        }
    
    },
    create : async (req, res, next) => {
    
        try {
            
            const person = new Person(req.body);
            await person.save();
    
            res.json(person);
    
        } catch (error) {
            res.json({ message: error.message });
        }
    
    },
    remove : async (req, res, next) => {
        
        try {
            
            const id = req.params.id;
            const person = await Person.findByIdAndDelete(id);
            res.json(person);
    
        } catch (error) {
            res.json({ message: error.message });
        }
    
    },
    getById : async (req, res, next) => {
    
        try {
            
            const person = await Person.findById(req.params.id);        
            res.json(person);
    
        } catch (error) {
            res.json({ message: error.message });
        }
    },
    update : async(req, res, next) => {
    
        try {
            
            const id = req.params.id;
            const body = req.body;
    
            const personUpdated = await Person.findOneAndUpdate({ _id: id }, body); 
            
            if (!personUpdated)
                res.json({ message: 'Person not found' });
            
            const person = await Person.findById(id);
            
            res.json(person);
            
    
        } catch (error) {
            res.json({ message: error.message });
        }
    
    }
}
// --- CONTROLLER

// ROUTER
const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
// --- ROUTER

server.use('/api/person', router);

const port = process.env.SERVER_PORT || 3000;

server.listen(port, async () => {
    console.log('Node Express is running on port ' + port);
    await connnectToDB();
});