import {
  GET_ALL_CHARACTER,
  GET_DETAILS_CHARACTER,
  FILTER_CHARACTER
} from '../constants';

const initialState = {
	listCharacter: {
    data: [],
    status_code: 0,
    error: null,
    nextPage: null,
  },
  characterDetails: null,
  filterBy: '',
  hasFiltered: false
}

const charReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHARACTER: {
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
    case GET_DETAILS_CHARACTER: {
      return {
        ...state, 
          characterDetails: {
            ...state.characterDetails, ...action.payload.data, isFulfilled: true
          }
      }
    }
    case FILTER_CHARACTER: {
      return {
        ...state,
        filterBy: action.payload,
        hasFiltered: true
      }
    }
    case 'PENDING_FILTER_CHARACTER': {
      return {
        ...state,
        filterBy: action.payload,
        hasFiltered: false
      }
    }
    default: return state;
  }
}

export default charReducer;
