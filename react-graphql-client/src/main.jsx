import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const uri = import.meta.env.VITE_GRAPHQL_URI;
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
)
