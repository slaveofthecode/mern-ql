import dotenv from 'dotenv';

dotenv.config();

const URL_API = {
    PERSON: `${process.env.NODE_API_URI}/person`
}

const main = {
    create: async (parent, args) => {
        const res = await fetch(URL_API.PERSON, {
            method: 'POST',
            body: JSON.stringify(args.person),
            headers: { 'Content-Type': 'application/json' }
        });
    
        const data = await res.json();
        
        return data;
    },
    remove: async (parent, args) => {        
        const url = `${URL_API.PERSON}/${args.id}`;        
        const res = await fetch(url, {
            method: 'DELETE',
        });

        const data = await res.json();

        return data;

    },
    update: async (parent, args) => {
        const url = `${URL_API.PERSON}/${args.id}`;        
        const res = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(args.person),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        
        return data;
        
    }
};

export default main;