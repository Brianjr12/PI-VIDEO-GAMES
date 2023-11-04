import axios from 'axios'
import {SAVE_GAMES,CHANGE_PAGE,GAME_BY_NAME} from './actionType.js'

export const saveGames = () => {
  return async (dispatch) => {
    try {
      const endPoint = "http://localhost:3001/api/videogames";
      const { data } = await axios.get(endPoint);
      dispatch({
        type: SAVE_GAMES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};


export const changePage = (page) => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/videogames?page=${page}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: CHANGE_PAGE,
        payload: {data,page}
      })
    } catch (error) {
      console.error(error);
    }
  }
}

export const searchGamesByName = (name) => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/videogames/name?name=${name}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: GAME_BY_NAME,
        payload: data
      })
    } catch (error) {
      console.error(error);
    }
  }
}


