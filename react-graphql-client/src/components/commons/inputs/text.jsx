/* eslint-disable react/prop-types */
import './index.scss';

const InputText = ({ 
    placeholder, 
    name,
    value,
    onChange
  }) => {
  return (
    <input 
        className="input-text"
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={onChange}
    />
  )
}

export default InputText