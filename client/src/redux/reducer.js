import {SAVE_GAMES,CHANGE_PAGE,GAME_BY_NAME} from './actionType.js'
const initialState = {
  games: [],
  gamesByName: [],
  page:1
}

const reducer = (state = initialState,{type,payload}) => {
  switch (type) {
    case SAVE_GAMES:
      return { ...state, games: payload }
    case CHANGE_PAGE:
      return { ...state, games: payload.data, page: payload.page };
    case GAME_BY_NAME:
      return { ...state, games: payload};
    default:
      return {...state};
  }
}

export default reducer