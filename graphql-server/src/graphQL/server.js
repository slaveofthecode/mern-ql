import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs/index.js';

const port = process.env.GRAPHQL_PORT || 4000;

const main = () => {
    const graphQLServer = new ApolloServer({
        typeDefs,
        resolvers,
        port,
    });
    
    startStandaloneServer(graphQLServer, {
        listen: { port }
        
    }).then(({ url }) => {
        console.log(`Server ready at ${url}`);

    }).catch(err => {
        console.log(err);

    });

}

export default main;