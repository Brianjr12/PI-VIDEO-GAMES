import { useSelector, useDispatch } from "react-redux";
import {filterByGenres} from '../../../redux/actions.js'

const FilterByGenres = () => {
  const genres = useSelector(({ genres }) => genres)
  const page = useSelector(({ page }) => page)
  const dispatch = useDispatch()
  const handleGenres = ({target}) => {
    const idSelect = target.value
    dispatch(filterByGenres(page,Number(idSelect)))
  }
  return (
      <div className="filter-container">
        <label htmlFor="filter">Filter By Genres:</label>
        <select name="filter" id="filter" onChange={handleGenres} >
          {genres && genres.map(({id,name}) => {
            return (
              <option key={id} value={id}>{name}</option>
            )
          })}
        </select>
      </div>
  );
}
export default FilterByGenres