import React from 'react';
import './main.scss';
import Logs from '../../components/logs/logs';
import Stats from '../../components/stats/stats';

function Main(props) {
  return (
    <div>
      <Stats {...props} />
      <Logs {...props} />
    </div>
  )
}

export default Main;