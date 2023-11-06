import axios from 'axios'
import {SAVE_GAMES,SAVE_GENRES,CHANGE_PAGE,GAMES_BY_NAME,GAME_BY_ID,FILTER_ORIGIN_BY_DB,FILTER_ORIGIN_BY_API,FILTER_BY_GENRES,SORT_ASCENDING,SORT_BY_RATING,SORT_DESCENDING} from './actionType.js'

export const saveGames = () => {
  return async (dispatch) => {
    try {
      const endPoint = "http://localhost:3001/api/videogames";
      const { data } = await axios.get(endPoint);
      dispatch({
        type: SAVE_GAMES,
        payload: { games:data.games,limit: data.limit },
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const saveGenres = () => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/genres`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: SAVE_GENRES,
        payload: data,
      })
    } catch (error) {
      console.error(error);
    }
  }
}


export const changePage = (page) => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/videogames?page=${page}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: CHANGE_PAGE,
        payload: {games:data.games,page}
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
        type: GAMES_BY_NAME,
        payload: data
      })
    } catch (error) {
      console.error(error);
    }
  }
}

export const getGameById = (id) => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/videogames/${id}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: GAME_BY_ID,
        payload: data
      })
    } catch (error) {
      console.error(error);
    }
  }
}

export const filterOriginByDB = (page) => {
  return async (dispatch) => {
    try {
      const regexIdDb = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
      const endPoint = `http://localhost:3001/api/videogames?page=${page}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: FILTER_ORIGIN_BY_DB,
        payload: data.games.filter(({ id }) => true === regexIdDb.test(id)),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const filterOriginByAPI = (page) => {
  return async (dispatch) => {
    try {
      const regexIdDb = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
      const endPoint = `http://localhost:3001/api/videogames?page=${page}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: FILTER_ORIGIN_BY_API,
        payload: data.games.filter(({ id }) => true !== regexIdDb.test(id)),
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const filterByGenres = (page,idSelect) => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/videogames?page=${page}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: FILTER_BY_GENRES,
        payload: data.games.filter(({ genres }) =>
          genres.some((genre) => genre.id === idSelect)
        ),
      });
      
    } catch (error) {
      console.error(error);
    }
  }
}

export const sortAscending = (page) => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/videogames?page=${page}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: SORT_ASCENDING,
        payload: data.games.sort((gameA, gameB) => gameA.name.localeCompare(gameB.name))
      })
    } catch (error) {
      console.error(error);
    }
  }
}

export const sortDescending = (page) => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/videogames?page=${page}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: SORT_DESCENDING,
        payload: data.games.sort((gameA, gameB) => gameA.name.localeCompare(gameB.name)),
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sortByRating = (page) => {
  return async (dispatch) => {
    try {
      const endPoint = `http://localhost:3001/api/videogames?page=${page}`;
      const { data } = await axios.get(endPoint);
      dispatch({
        type: SORT_BY_RATING,
        payload: data.games.sort((gameA, gameB) => gameB.rating - gameA.rating),
      });
    } catch (error) {
      console.error(error);
    }
  };
};