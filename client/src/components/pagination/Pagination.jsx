import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/actions";

const Pagination = () => {
  const dispatch = useDispatch();
  const page = useSelector(({ page }) => page);
  const nextPage = () => {
    dispatch(changePage(page + 1));
  };
  const prevPage = () => {
    dispatch(changePage(page - 1));
  };

  return (
    <div>
      {page > 1 && <button onClick={prevPage}> {"< Prev"}</button>}
      {page < 7 && <button onClick={nextPage}>{"Next >"}</button>}
      <h1>Page: {page}</h1>
    </div>
  );
};
export default Pagination;
