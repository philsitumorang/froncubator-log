import axios from 'axios';
import { toQuery } from '../services/helperService';

export async function getLogs(dispatch, query) {
  query = toQuery(query);
  const data = (await axios.get(`/api/logs?${query}`)).data;
  dispatch({
    type: 'UPDATE_LOGS',
    payload: data.logs
  });
}