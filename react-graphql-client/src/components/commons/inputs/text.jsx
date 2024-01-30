/* eslint-disable react/prop-types */
import './index.scss';

const InputText = ({ placeholder, name }) => {
  return (
    <input 
        className="input-text"
        placeholder={placeholder} 
        name={name}
    />
  )
}

export default InputText