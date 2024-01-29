import dotenv from 'dotenv';

dotenv.config();

const URL_API = {
    PERSON: `${process.env.NODE_API_URI}/person`
}

const main = {
    getCount: async () => {
        const data = await fetchGetAllPerson();        
        return data.length;

    },
    getAll: async () => {
        const data = await fetchGetAllPerson();
        return data;

    },
    getById: async (parent, args) => {
        const url = `${URL_API.PERSON}/${ args.id }`;        
        const res = await fetch(url, {
            method: 'GET',
        });
        const data = await res.json();
                        
        return data;

    }
};

export default main;

async function fetchGetAllPerson() {
    const res = await fetch(URL_API.PERSON, {
        method: 'GET',
    });
    
    return await res.json();

}