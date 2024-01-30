/* eslint-disable react/prop-types */
import './index.scss';

const InputRadio = ({ id, name, value, text}) => {
  return (
    <div className='input-radio'>
        <input 
          type="radio" 
          id={id} 
          name={name} 
          value={value}
        />
        <label htmlFor={id}>
          {text}
        </label>
    </div>
  )
}

export default InputRadio