/* eslint-disable react/prop-types */
import GridPersons from '../src/pages/GridPersons.jsx';

import './App.css';
import InputRadio from './components/commons/inputs/radio.jsx';
import InputText from './components/commons/inputs/text.jsx';
 
function App() {  

  return (
    <>
      <h1>React + GraphQL + Node</h1>
      <hr />
      <div >
        <h2 style={{ textAlign: 'start' }}>Create</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '10px'
        }}>
          <span style={{ display: 'block', width: '100px', textAlign:'end' }}>Main Data</span>
          <InputText placeholder={'name'} name={'name'} />
          <InputText placeholder={'age'} name={'age'} />
          <InputText placeholder={'email'} name={'email'} />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '10px'
        }}>
          <span style={{ display: 'block', width: '100px', textAlign:'end' }}>Address</span>
          <InputText placeholder='street' name='street' />
          <InputText placeholder='city' name='city' />
          <InputText placeholder='country' name='country' />      
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '10px'
        }}>
          <span style={{ display: 'block', width: '100px', textAlign:'end' }}>Gender</span>
          <InputRadio id="male" name="gender" value="MALE" text="Male" />
          <InputRadio id="female" name="gender" value="FEMALE" text="Female" />  
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
          }}
        >
            Create
        </button>
      </div>

      <hr />
      <div style={{ position: 'relative'}}>
        <h2 style={{ textAlign: 'start' }}>Grid</h2>
        <GridPersons />
      </div>      

      <hr />
      <p className="read-the-docs">
        Basic version created by <a href='https://www.linkedin.com/in/gustavoml/'><em>slaveofthecode</em></a>
      </p>
    </>
  )
}

export default App
