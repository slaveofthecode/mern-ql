import Mutation from './mutation.js';
import Query from './query.js';

const main = {
    Query,
    Mutation,
    Person: {
        id: (root) => root._id,
        address: (root) => {
            return {
                ...root.address,
                country: root.address.country ?? '',
                online: `${root.address.city}, ${root.address.country ?? ''}`
            }
        }
    },
    Address: {
        street: (root) => root.street ?? ''
    }
};

export default main;