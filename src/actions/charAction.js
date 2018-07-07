import { API_CALL } from '../utils';
import {
  GET_ALL_HERO
} from '../constants';

export const fetchCharacter = ({ page }) => async dispatch => {
  function onSuccess(data) {
		dispatch({
			type: GET_ALL_HERO,
			payload: data
		});
		return data;
  }
  
  try {
    const option = {
      method: 'GET',
      url: `api/people/?page=${page}`
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
