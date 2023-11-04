import { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards.jsx";
import './HomePage.css'
import { useDispatch, useSelector } from 'react-redux'
import {saveGames} from '../../redux/actions.js'
import Pagination from "../../components/pagination/Pagination.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";

const HomePage = () => {
  const videoGames = useSelector(({games}) => games)
  const dispatch = useDispatch();
console.log("games",videoGames);
  useEffect(() => {
    dispatch(saveGames())
  },[dispatch]);

  return (
    <div id="home" className="container-home">
      <NavBar/>
      <Pagination/>
      <Cards games={videoGames}/>
    </div>
  );
};

export default HomePage;
