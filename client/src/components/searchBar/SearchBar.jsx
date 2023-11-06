import { useState } from "react"
import { useDispatch } from "react-redux"
import './SearchBar.css'
import {searchGamesByName} from '../../redux/actions.js'

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleChange = ({ target }) => setName(target.value);
  
  const handleSearch = () => {
    dispatch(searchGamesByName(name))
    setName("");
  }
  return (
    <div className="searchbar-container">
      <input
        type="text"
        onChange={handleChange}
        value={name}
        placeholder="Search..."
        className="searchbar-input"
      />

      <button onClick={handleSearch} className="searchbar-button">
        Search
      </button>
    </div>
  );
}
export default SearchBar