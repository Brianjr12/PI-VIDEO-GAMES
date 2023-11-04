import { useSelector } from 'react-redux'
import Cards from '../components/cards/Cards'
import NavBar from '../components/navBar/NavBar';
const GamesNamePage = () => {
  const gamesByName = useSelector(({ gamesByName }) => gamesByName);
  console.log("names", gamesByName);
  return (
    <div>
      <NavBar/>
      <Cards games={gamesByName}/>
    </div>
  )
}
export default GamesNamePage