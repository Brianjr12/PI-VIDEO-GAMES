import {
  SAVE_GAMES,
  CHANGE_PAGE,
  GAMES_BY_NAME,
  GAME_BY_ID,
  FILTER_ORIGIN_BY_DB,FILTER_ORIGIN_BY_API,
  SAVE_GENRES,FILTER_BY_GENRES,SORT_ASCENDING,SORT_BY_RATING,SORT_DESCENDING
} from "./actionType.js";
const initialState = {
  games: [],
  gameById: {},
  genres: [],
  limit: 0,
  page: 1,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_GAMES:
      return { ...state, games: payload.games, limit: payload.limit };
    case SAVE_GENRES:
      return { ...state, genres: payload };
    case CHANGE_PAGE:
      return { ...state, games: payload.games, page: payload.page };
    case GAMES_BY_NAME:
      return { ...state, games: payload };
    case GAME_BY_ID:
      return { ...state, gameById: payload };
    case FILTER_ORIGIN_BY_DB:
      return { ...state, games: payload };
    case FILTER_ORIGIN_BY_API:
      return { ...state, games: payload };
    case FILTER_BY_GENRES:
      return { ...state, games: payload };
    case SORT_ASCENDING:
      return { ...state, games: payload }
    case SORT_DESCENDING:
      return { ...state, games: payload }
    case SORT_BY_RATING:
      return { ...state, games: payload }
    default:
      return { ...state };
  }
};

export default reducer;
