/* eslint-disable react/prop-types */
import './index.scss';

const ButtonPrimary = ({ text }) => {
  return (
    <button className='button-primary'>
        { text }
    </button>
  )
}

export default ButtonPrimary