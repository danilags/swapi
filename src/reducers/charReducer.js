import {
  GET_ALL_CHARACTER,
  GET_DETAILS_CHARACTER,
  FILTER_CHARACTER,
  PENDING_FETCH_CHARACTER
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
  hasFiltered: false,
  isFetch: false
}

const charReducer = (state = initialState, action) => {
  switch (action.type) {
    case PENDING_FETCH_CHARACTER: {
      return {
        ...state, isFetch: action.payload
      }
    }
    case GET_ALL_CHARACTER: {
      if (action.payload.status_code !== 404) {
        const { results, next } = action.payload.data;
        return {
          ...state, 
            listCharacter: {
              ...state.listCharacter, 
                data: [ ...state.listCharacter.data, ...results ],
                status_code: action.payload.status,
                nextPage: next
            },
            isFetch: false
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
            ...state.characterDetails, ...action.payload.data
          },
          isFetch: false
      }
    }
    case FILTER_CHARACTER: {
      if (action.payload === "Vehicles") {
        const lastState = [ ...state.listCharacter.data ]
        const vehiclesFiltering = lastState.filter(item => item.vehicles.length !== 0)
        return {
          ...state,
            listCharacter: {
              ...state.listCharacter, data: vehiclesFiltering 
            },
            filterBy: action.payload,
            hasFiltered: true
        }
      }
      return {
        ...state,
        filterBy: action.payload,
        hasFiltered: false
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
