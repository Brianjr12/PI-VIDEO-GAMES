import { useDispatch, useSelector } from "react-redux";
import {sortAscending,sortDescending,sortByRating} from '../../../redux/actions.js'

const Sorts = () => {
  const page = useSelector(({ page }) => page)
  const dispatch = useDispatch()
  const sortsHandle = ({target}) => {
    const optionSelect = target.value;
    if (optionSelect === "Ascending") {
      dispatch(sortAscending(page));
    }

    if (optionSelect === "Descending") {
      dispatch(sortDescending(page));
    }

    if (optionSelect === "Rating") {
      dispatch(sortByRating(page));
    }
  }


  return (
    <div className="sort-container">
      <label htmlFor="sort">Sort By:</label>
      <select name="sort" id="sort" onChange={sortsHandle} >
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
        <option value="Rating">Rating</option>
      </select>
    </div>
  );
}
export default Sorts