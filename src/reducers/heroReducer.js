const initialState = {
	heroData: {
    data: [],
		isFetch: false,
		error: null
	}
}

const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_HERO': return initialState;
    default: return state;
  }
}

export default heroReducer;
