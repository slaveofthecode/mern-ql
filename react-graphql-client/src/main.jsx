import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const GRAPHQL_URI = 'http://localhost:4000/';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
)
