import { useDispatch, useSelector } from 'react-redux'
import {filterOriginByDB,filterOriginByAPI} from '../../../redux/actions.js'
const FilterByOrigin = () => {
  const page = useSelector(({ page }) => page);
  const dispatch = useDispatch();
  const handleFilter = ({ target }) => {
    const selectValue = target.value;
    if (selectValue === "DB") {
      dispatch(filterOriginByDB(page));
    }

    if (selectValue === "API") {
      dispatch(filterOriginByAPI(page))
    }
  };
  return (
      <div className="filter-container">
        <label htmlFor="filter">Filter By origin:</label>
        <select name="filter" id="filter" onChange={handleFilter} >
            <option value="DB">Database</option>
            <option value="API">API</option>
        </select>
      </div>
  )
}
export default FilterByOrigin