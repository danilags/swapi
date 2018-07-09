import { API_CALL } from '../utils';
import {
  GET_ALL_CHARACTER,
  FILTER_CHARACTER
} from '../constants';

export const fetchCharacter = ({ url, type }) => async dispatch => {
  function onSuccess(data) {
		dispatch({
			type,
			payload: data
		});
		return data;
  }
  
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
  function onPending() {
    dispatch({
			type: 'PENDING_FILTER_CHARACTER',
			payload: ''
		});
		return params;
  }
  function onSuccess(params) {
		dispatch({
			type: FILTER_CHARACTER,
			payload: params
		});
		return params;
  }
  
  onPending();

	try {
    setTimeout(() => { 
      return onSuccess(params);
    }, 2000);
		
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

