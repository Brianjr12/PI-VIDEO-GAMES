import './Card.css'
import { NavLink } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { getGameById } from '../../redux/actions.js'
import {useLocation} from 'react-router-dom'
const Card = ({ name, image, id,gameById,genres}) => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const getGame = () => {
    dispatch(getGameById(id))
  }
  return (
    <div>
    {pathname === "/home" && (<NavLink to="/detail">
      <div className='container' onClick={getGame} >
        <h1 className='card-name' >{name}</h1>
          <img src={image} alt="videogame image" className='container-img' />
          {genres?.map(({id,name}) => {
            return (
              <div key={id}>
                <p>{name}</p>
              </div>
            )
          })}
        <p className=''>{""}</p>
      </div>
    </NavLink>)}
   
      {pathname === "/detail" && (<div>
        <h1>{gameById?.name}</h1>
        <img src={gameById?.image} alt="videogame image" />
    </div>)}
  </div>
    
  );
}
export default Card