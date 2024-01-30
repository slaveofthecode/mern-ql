/* eslint-disable react/prop-types */
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import InputText from '../components/commons/inputs/text';

const Update = ({ idPerson, setIdToUpdate }) => {

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

  const [ personToUpdate, setPersonToUpdate ] = useState(null);

  const [
    getByID,
    // { data, loading }
  ] = useLazyQuery(queryGetById, {
    fetchPolicy: 'no-cache'
  });

  const getByIdAsync = async () => {
    await getByID({
      variables: { id: idPerson }
    }).then( (res) => {      
      setPersonToUpdate({ ...res?.data?.getById });
    });
  }

  useEffect( () =>{  
    if (idPerson) 
      getByIdAsync();

  }, []);

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

  const handleOnChangeUpdate = (evt) => {

    const { name, value } = evt.target;

    setPersonToUpdate({
      ...personToUpdate,
      [name]: value
    });
  }

  const handleSaveUpdate = async () => {    
    await update({
      variables: { 
        updateId: idPerson,
        personToUpd: {
          name: personToUpdate.name,
          age: parseInt(personToUpdate.age),
          email: personToUpdate.email
        }
      }
    }).then(() => {
      handleOnClickCancelUpdate(null);
    });
  }

  const handleOnClickCancelUpdate = () => {
    setPersonToUpdate(null);
    setIdToUpdate(null);
  }

  return (
    <div>
      <h2>Update</h2>
      {
        personToUpdate && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '10px'
            }}>
              <span style={{ display: 'block', width: '100px', textAlign:'end' }}>Main Data</span>
              <InputText
                placeholder={'name'}
                value={personToUpdate?.name ?? ''} 
                onChange={handleOnChangeUpdate} 
                name='name' 
              />
              <InputText 
                placeholder={'age'}
                value={personToUpdate?.age ?? ''} 
                onChange={handleOnChangeUpdate} 
                name='age' 
              />
              <InputText
                placeholder={'email'} 
                value={personToUpdate?.email ?? ''} 
                onChange={handleOnChangeUpdate} 
                name='email' 
              />
              <button 
                style={{
                  width: '50%'
                }}
                onClick={handleSaveUpdate} >
                  ✔
              </button>
              <button 
                style={{
                  width: '50%'
                }}
                onClick={handleOnClickCancelUpdate} >
                  ❌
                </button>
            </div>
          </>  
        )
      }
    </div>
  );
}

export default Update