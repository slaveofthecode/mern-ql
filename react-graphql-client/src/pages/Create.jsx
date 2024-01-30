import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import CardColumn from '../components/card/column';
import ButtonPrimary from '../components/commons/buttons/primary';
import InputRadio from '../components/commons/inputs/radio';
import InputText from '../components/commons/inputs/text';

const Create = () => {
    const mutationCreate = gql`
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
  ] = useMutation(mutationCreate, {
    refetchQueries: [
      {
        query: queryGetAll
      }
    ],
    onError: (error) => { console.log('ERROR CREATE', error)},    
    onCompleted: (data) => setDataUpdated(data)
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

  const [ dataUpdated, setDataUpdated] = useState(null);

  return (
    <>
      <h2>Create</h2>
        <form onSubmit={handleOnSubmit}>           
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            
            }}>
                <CardColumn title='Main data'>
                    <InputText placeholder='name' name='name' />
                    <InputText placeholder='age' name='age' />
                    <InputText placeholder='email' name='email' />
                </CardColumn>
                
                <CardColumn title='Address'>
                    <InputText placeholder='street' name='street' />
                    <InputText placeholder='city' name='city' />
                    <InputText placeholder='country' name='country' />      
                </CardColumn>

                <CardColumn title='Gender' >
                    <div>
                        <InputRadio id="male" name="gender" value="MALE" text="Male" />
                        <InputRadio id="female" name="gender" value="FEMALE" text="Female" />            
                    </div>
                </CardColumn>
            </div> 

            
          <ButtonPrimary text={ loading ? 'loading...' : 'Add '} />          
          { error && <p> {error.message } </p>}
          {
            dataUpdated && ( () => {
              setTimeout( () => { setDataUpdated(null); }, 5000);
              return <p> { data.create.id } - { data.create.name } </p> 
            } )()
          }
        </form>
    </>
  );
}

export default Create