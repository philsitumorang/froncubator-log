import axios from 'axios';

export async function getStats(dispatch) {
  const data = (await axios.get('/api/stats')).data;
  dispatch({
    type: 'UPDATE_STATS',
    payload: data.stats
  });
}