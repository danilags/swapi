import {
  GET_ALL_HERO
} from '../constants';

const initialState = {
	listCharacter: {
    data: [],
    status_code: 0,
    error: null,
    nextPage: null,
	}
}

const charReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_HERO: {
      if (action.payload.status_code !== 404) {
        const { results, next } = action.payload.data;
        return {
          ...state, 
            listCharacter: {
              ...state.listCharacter, 
                data: results,
                status_code: action.payload.status,
                nextPage: next
            } 
        }
      }
      return {
        ...state, 
          listCharacter: {
            ...state.listCharacter, 
              status_code: action.payload.status_code,
              error: action.payload.message
          }
      }
      
    }
    default: return state;
  }
}

export default charReducer;
