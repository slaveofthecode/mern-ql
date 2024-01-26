/* eslint-disable react/prop-types */
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css';
 
function App() {  

  return (
    <>
      <h1>React + GraphQL + Node</h1>
      <div className="card">
        <CreateComponent />
      </div>      
      <hr />
      <div className="card">
        <GetAllComponent />
      </div>
      <hr />
      <p className="read-the-docs">
        Basic version created by <a href='https://www.linkedin.com/in/gustavoml/'><em>slaveofthecode</em></a>
      </p>
    </>
  )
}

export default App


function GetAllComponent () {

  const query = gql`
    query {
      getAll {
        id
        name
        age
        email
        address {
          country
          online
        }
      }
    }
  `;

  const resultQuery = useQuery(query)

  // REMOVE
  const mutationRemove = gql`
    mutation($removeId: ID!) {
      remove(id: $removeId) {
        id
        name
      }
    }
  `;
  const [
    remove, 
    // { loading, error, data }
  ] = useMutation(mutationRemove, {
    refetchQueries: [{ query }],
    onError: (error) => { console.log('ERROR MUTATION', error)}
  });

  const handleOnClickRemove = async (idPerson) => {
    await remove({
      variables: {
        removeId: idPerson
      }
    });
  }
  // --- REMOVE

  
  const [ idToUpdate, setIdToUpdate] = useState(null);
 

  return (
    <>
      <h2>Get All <small>( {resultQuery.data?.getAll.length} )</small></h2>
        { resultQuery.loading && <p>loading...</p> }
        { resultQuery.error && <p>ERROR: {resultQuery.error.message} </p> }
        {
          resultQuery.data && (
            resultQuery.data.getAll.map((pers) => {
              return (
                <div key={pers.id} style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <h3 style={{ margin: '5px 0' }}>{pers.name}</h3>
                  <small>{pers.email} - {pers.id}</small>                  
                  <button onClick={ () => setIdToUpdate(pers.id) } style={{ fontSize: '0.5em' }} >✏️</button>
                  <button onClick={ () => handleOnClickRemove(pers.id) } style={{ fontSize: '0.5em' }} >❌</button>                  
                </div>
              );
            })
          )
        }
        <UpdateComponent idPerson={idToUpdate} setIdToUpdate={setIdToUpdate} />        
    </>
  );
}

function CreateComponent () {

  const mutation = gql`
    mutation($person: PersonCreate!) {
      create(person: $person) { 
        id   
        name
      }
    }
  `;

  const queryGetAll = gql`
    query {
      getAll {
        id
        name
        age
        email
        address {
          country
          online
        }
      }
    }
  `;

  const [
    create,
    {
      loading,
      error,
      data
    }
  ] = useMutation(mutation, {
    refetchQueries: [
      {
        query: queryGetAll
      }
    ],
    onError: (error) => { console.log('ERROR CREATE', error)}
  });

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const {
      name,
      age,
      email,
      street,
      city,
      country,
      gender
    } = evt.target;

    await create({
      variables :{
        person: {
          name: name.value,
          age: parseInt(age.value),
          gender: gender.value,
          email: email.value,
          address: {
            street: street.value,
            city: city.value,
            country: country.value
          }
        }
      }
    }).then(() => {
        name.value = '';
        age.value = '';
        email.value = '';
        street.value = '';
        city.value = '';
        country.value = '';
        gender.value = '';
    });

  }

  return (
    <>
      <h2>Create</h2>
        <form onSubmit={handleOnSubmit}>
          Data
          <div>
            <input placeholder='name' name='name' />
            <input placeholder='age' name='age' />
            <input placeholder='email' name='email' />

            <div>
              <input type="radio" id="male" name="gender" value="MALE" />
              <label htmlFor="male">M</label>
            </div>

            <div>
              <input type="radio" id="female" name="gender" value="FEMALE" />
              <label htmlFor="female">F</label>
            </div>
          </div>
          Address
          <div>
            <input placeholder='street' name='street' />
            <input placeholder='city' name='city' />
            <input placeholder='country' name='country' />
          </div>
          <button>
            { loading ? 'loading...' : 'Add '}
          </button>
          { error && <p> {error.message } </p>}
          { data && (
            <p> { data.create.id } - { data.create.name } </p> 
          )}
        </form>
    </>
  );
}

function UpdateComponent ({ idPerson, setIdToUpdate }) {
  
  const queryGetById = gql`
    query($id: ID!) {
      getById(id: $id) {
        name
        age
        email
        gender
        address {
          street
          city
          country
        }
      }
    }
  `;

  const [ personTpUpdate, setPersonTpUpdate ] = useState(null);

  const [
    getByID,
    { data, loading }
  ] = useLazyQuery(queryGetById);

  const getByIdAsync = async () => {
    await getByID({
      variables: { id: idPerson }
    }).then( (res) => {
      console.log('RES', res?.data?.getById);
      console.log('DAT', data?.getById);
      console.log('LOD', loading);
      setPersonTpUpdate({ ...res?.data?.getById });
    });
  }

  useEffect( () =>{  
    if (idPerson) 
      getByIdAsync();

  }, [idPerson]);

  const mutationUpdate = gql`
    mutation($updateId: ID!, $personToUpd: PersonUpdate) {
      update(id: $updateId, person: $personToUpd) {
        id
        name
        email
      }
    }
  `;
  const [
    update,
    // { loading, data, error }
  ] = useMutation(mutationUpdate, {
    refetchQueries: [
      {
        query: gql`
          query {
            getAll {
              id
              name
              age
              email
              address {
                country
                online
              }
            }
          }
        `
      }
    ],
    onError: (error) => { console.log('ERROR CREATE', error)}
  });

  if (!idPerson) return null;

  const handleOnChangeUpdate = (evt) => {

    const { name, value } = evt.target;

    setPersonTpUpdate({
      ...personTpUpdate,
      [name]: value
    });
  }

  const handleSaveUpdate = async () => {    
    await update({
      variables: { 
        updateId: idPerson,
        personToUpd: {
          name: personTpUpdate.name,
          age: parseInt(personTpUpdate.age),
          email: personTpUpdate.email
        }
      }
    }).then(() => {
      handleOnClickCancelUpdate(null);
    });
  }

  const handleOnClickCancelUpdate = () => {
    setPersonTpUpdate(null);
    setIdToUpdate(null);
  }

  return (
    <>
      <h2>Update</h2>
      <ol>
        <li>name : <input value={personTpUpdate?.name ?? ''} onChange={handleOnChangeUpdate} name='name' /></li>        
        <li>age : <input value={personTpUpdate?.age ?? ''} onChange={handleOnChangeUpdate} name='age' /></li>
        <li>email : <input value={personTpUpdate?.email ?? ''} onChange={handleOnChangeUpdate} name='email' /></li>                
      </ol>
      <button onClick={handleSaveUpdate} >✔</button>
      <button onClick={handleOnClickCancelUpdate} >❌</button>
    </>
  );

}