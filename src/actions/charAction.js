import { API_CALL } from '../utils';
import {
  GET_ALL_CHARACTER,
  FILTER_CHARACTER,
  PENDING_FETCH_CHARACTER
} from '../constants';

export const fetchCharacter = ({ url, type }) => async dispatch => {
  function onSuccess(data) {
		dispatch({
			type,
			payload: data
		});
		return data;
  }

  function onPending() {
		dispatch({
			type: PENDING_FETCH_CHARACTER,
			payload: true
		});
		return true;
  }

  onPending();
  
  try {
    const option = {
      method: 'GET',
      url: `api/${url}`
    };
    const res = await API_CALL(option);
    onSuccess(res);
  } catch (error) {
    const errMsg = {
      status_code: 404,
      message: 'Not found'
    };
    onSuccess(errMsg)
  }
}

export const filterCharacter = (params) => async dispatch => {
  function onSuccess(params) {
		dispatch({
			type: FILTER_CHARACTER,
			payload: params
		});
		return params;
  }
  
	try {
    return onSuccess(params);
		
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

