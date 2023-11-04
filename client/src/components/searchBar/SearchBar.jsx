import { useState } from "react"
import { useDispatch } from "react-redux"
import {NavLink} from 'react-router-dom'
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
    <div>
      <input type="text" onChange={handleChange} value={name} placeholder="Search..." />
      {/* <NavLink to="/name"> */}
      <button onClick={handleSearch} >Search</button>
      {/* </NavLink> */}
    </div>
  )
}
export default SearchBar