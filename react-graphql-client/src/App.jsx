/* eslint-disable react/prop-types */
import { useState } from 'react';
import GridPersons from '../src/pages/GridPersons.jsx';
import Create from './pages/Create.jsx';
import Update from './pages/Update.jsx';

import './App.css';
 
function App() {  

  const [ idToUpdate, setIdToUpdate] = useState(null);

  return (
    <>
      <h1>React + GraphQL + Node</h1>
      <hr />
      <div >        
        { 
          idToUpdate 
            ? <Update idPerson={idToUpdate} setIdToUpdate={setIdToUpdate} /> 
            : <Create />
        }
      </div>

      <hr />
      <div style={{ position: 'relative'}}>
        <h2 style={{ textAlign: 'start' }}>Grid</h2>
        <GridPersons setIdToUpdate={setIdToUpdate} />
      </div>      

      <hr />
      <p className="read-the-docs">
        Basic version created by <a href='https://www.linkedin.com/in/gustavoml/'><em>slaveofthecode</em></a>
      </p>
    </>
  )
}

export default App
