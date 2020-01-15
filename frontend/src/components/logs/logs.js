import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../state/useGlobalState';
import moment from 'moment';
import './logs.scss';
import { getLogs } from '../../services/logsService';
import { parseQuery, toQuery } from '../../services/helperService';

function Logs(props) {
  let query = {};
  const [prevPage, setPrevPage] = useState({});
  const [nextPage, setNextPage] = useState({});
  
  const [{ logs }, dispatch] = useGlobalState();

  useEffect(() => {
    query = parseQuery(props.location.search);
    calcPrevNextPages(query);
    getLogs(dispatch, query);
  }, []);

  function calcPrevNextPages(query) {
    let _prevPage, _nextPage;

    if (query.page) {
      let page = +query.page;
      if (page < 1) {
        _prevPage = 1;
        _nextPage = 2;
      } else {
        _prevPage = page - 1;
        _nextPage = page + 1;
      }
    } else {
      _prevPage = 1;
      _nextPage = 2;
    }

    setPrevPage({
      ...query,
      page: _prevPage
    });
    setNextPage({
      ...query,
      page: _nextPage
    });
  }

  function setTypeColor(type) {
    let color;

    switch(type) {
      case 'warning':
        color = '#ad8e19';
      break;
      case 'debug':
        color = '#777';
      break;
      case 'error':
        color = '#ad1919';
      break;
      default:
        color = '#000';
        break;
    }

    return (<span style={{ color }}>{type.toUpperCase()}</span>)
  }

  return (
    <div className="logs">
      <table className="logs-table">
        <tbody>
          <tr>
            <th>Type</th>
            <th>Header</th>
            <th>Project</th>
            <th>Service</th>
            <th>Message</th>
            <th>TS</th>
          </tr>
          {logs.map(log => (
            <tr key={log._id}>
              <td>{setTypeColor(log.type)}</td>
              <td>{log.header}</td>
              <td>{log.project}</td>
              <td>{log.service}</td>
              <td><pre>{log.message}</pre></td>
              <td>
                <div className="date-format">
                  <b>{moment(log.ts).format('DD.MM.YY')}</b><br/>
                  <span>{moment(log.ts).format('HH:mm:ss')}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <a href={`/?` + toQuery(prevPage)}>Prev</a> | <a href={`/?` + toQuery(nextPage)}>Next</a>
      </div>
    </div>
  )
}

export default Logs;