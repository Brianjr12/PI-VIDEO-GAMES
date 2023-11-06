import ByOrigin from "../dropdowns/filters/ByOrigin.jsx";
import ByGenres from "../dropdowns/filters/ByGenres.jsx";
import Sorts from "../dropdowns/sorts/Sorts.jsx";

const Header = () => {
  return (
    <div className="header-container">
      <div className="filter-container">
      <ByGenres/>
     <ByOrigin/>
      </div>
      <div className="sorts-container">
        <Sorts/>
    </div>
      
    </div>
  );
};
export default Header;
