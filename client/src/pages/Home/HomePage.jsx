import { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards.jsx";
import './HomePage.css'
import { useDispatch, useSelector } from 'react-redux'
import {saveGames,saveGenres} from '../../redux/actions.js'
import Pagination from "../../components/pagination/Pagination.jsx";

const HomePage = () => {
  const videoGames = useSelector(({games}) => games)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveGames())
    dispatch(saveGenres())
  },[dispatch]);

  return (
    <div id="home" className="container-home">
      <Pagination/>
      <Cards games={videoGames}/>
    </div>
  );
};

export default HomePage;
