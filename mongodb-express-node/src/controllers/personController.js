import Person from "../db/mongodb/schemas.js";


const get = async (req, res, next) => {
    
    try {    
        const persons = await Person.find();
        res.json(persons);
    } catch (error) {
        res.json({ message: error.message });
    }

};
const create = async (req, res, next) => {

    try {
        
        const person = new Person(req.body);
        await person.save();

        res.json(person);

    } catch (error) {
        res.json({ message: error.message });
    }

};

const remove = async (req, res, next) => {
    
    try {
        
        const id = req.params.id;
        const person = await Person.findByIdAndDelete(id);
        res.json(person);

    } catch (error) {
        res.json({ message: error.message });
    }

};

const getById = async (req, res, next) => {

    try {
        
        const person = await Person.findById(req.params.id);        
        res.json(person);

    } catch (error) {
        res.json({ message: error.message });
    }
};

const update = async(req, res, next) => {

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

};

export default {
    create, get, remove, getById, update
};