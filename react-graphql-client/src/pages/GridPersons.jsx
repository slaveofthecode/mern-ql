import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import Update from './Update';

const GridPersons = () => {
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

  const resultGetAll = useQuery(queryGetAll)

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
    refetchQueries: [{ query: queryGetAll }],
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
      <small style={{
        position: 'absolute',
        top: '0', 
        right: '0',
       }}>
        Total rows: ( {resultGetAll.data?.getAll.length} )
      </small>
        { resultGetAll.loading && <p>loading...</p> }
        { resultGetAll.error && <p>ERROR: {resultGetAll.error.message} </p> }
        {
          resultGetAll.data && (
            resultGetAll.data.getAll.map((pers) => {
              return (
                <div 
                  key={pers.id} 
                  style={{
                    border: '1px solid rgb(204, 204, 204)',
                    borderRadius: '5px',
                    padding: '10px',
                    margin: '5px 0px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  
                  <small style={{ textAlign: 'start'}} >ID : {pers.id}</small>                  
                  <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <h3 style={{ margin: '5px 0' }}>{pers.name}</h3>
                      <h5 style={{ margin: '0'}} >{pers.email}</h5>                  
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <button onClick={ () => setIdToUpdate(pers.id) } style={{ fontSize: '0.5em' }} >✏️</button>
                      <button onClick={ () => handleOnClickRemove(pers.id) } style={{ fontSize: '0.5em' }} >❌</button>                  
                    </div>
                  </div>

                </div>
              );
            })
          )
        }
        { idToUpdate && <Update idPerson={idToUpdate} setIdToUpdate={setIdToUpdate} /> }
        
    </>
  );
}

export default GridPersons