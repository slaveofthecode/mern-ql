/* eslint-disable react/prop-types */
import './index.scss';

const CardColumn = ({ title, children }) => {
  return (
    <div className='card-column'>
        <span>{ title }</span>
        { children }                
    </div>
  )
}

export default CardColumn