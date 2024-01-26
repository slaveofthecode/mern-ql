import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';

dotenv.config();

const graphQLServer = new ApolloServer({
    typeDefs: `
        enum GENDER {
            MALE
            FEMALE
        }

        type Query {
            getCount: Int!
            getAll: [Person]
            getById(id: ID!): Person
        }

        type Mutation {
            create(person: PersonCreate!): Person
            remove(id: ID!): Person
            update(id: ID!, person: PersonUpdate): Person
        }

        type Person {
            id: ID!
            name: String!
            age: Int!
            gender: GENDER!
            phone: String
            email: String
            address: Address!
            cretedAt: String!
        }

        type Address {
            street: String!
            city: String!
            country: String!
            online: String
        }

        input InputAddress {
            street: String!
            city: String!
            country: String!
        }

        input PersonCreate {
            name: String!
            age: Int!
            gender: GENDER!
            phone: String
            email: String!
            address: InputAddress!
        }

        input PersonUpdate {
            name: String
            age: Int
            gender: GENDER
            phone: String
            email: String
            address: InputAddress
        }

    `,
    resolvers: {
        Query : {
            getCount: async () => {
                const url = `${process.env.NODE_API_URI}/person`;
                
                const res = await fetch(url, {
                    method: 'GET',
                });
                const data = await res.json();
                
                return data.length;
            },
            getAll: async () => {
                const url = `${process.env.NODE_API_URI}/person`;
                
                const res = await fetch(url, {
                    method: 'GET',
                });
                const data = await res.json();

                return data;
            },
            getById: async (parent, args) => {
                const url = `${process.env.NODE_API_URI}/person`;
                
                const res = await fetch(url, {
                    method: 'GET',
                });

                const data = await res.json();            
                const { id } = args;

                const person = await data.find(p => p._id === id);
                                
                return person;
            }
        },
        Mutation: {
            create: async (parent, args) => {
                const url = `${process.env.NODE_API_URI}/person`;                
                const res = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(args.person),
                    headers: { 'Content-Type': 'application/json' }
                });
            
                const data = await res.json();
                
                return data;
            },
            remove: async (parent, args) => {
                const { id } = args;
                const url = `${process.env.NODE_API_URI}/person/${id}`;
                
                const res = await fetch(url, {
                    method: 'DELETE',
                });

                const data = await res.json();

                return data;
            },
            update: async (parent, args) => {
                 const { id, person } = args;

                 const url = `${process.env.NODE_API_URI}/person/${id}`;
                
                const res = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(args.person),
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json();
                
                return data;
            }
        },
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
    },
    port: process.env.GRAPHQL_PORT
});

startStandaloneServer(graphQLServer, {
    listen: {
        port: process.env.GRAPHQL_PORT || 4000
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
}).catch(err => {
    console.log(err);
});

