import React, { useEffect, useState } from 'react';
import { Icon, Checkbox } from 'antd';
import { useGlobalState } from '../../state/useGlobalState';
import { parseQuery, toQuery } from '../../services/helperService';
import { getLogs } from '../../services/logsService';
import './filter.scss';

let interval;

function Filter() {

  const [isAutoLoad, setIsAutoLoad] = useState(true);
  const [filterForm, setFilterForm] = useState({});
  const [{}, dispatch] = useGlobalState();

  useEffect(() => {
    let query = parseQuery(window.location.search);
    setFilterForm(query);
    switchAutoload({ target: { checked: true } });
  }, []);

  function clearFilter() {
    window.location.href = '/';
  }

  function saveFilter() {
    let query = {};
    for (let key in filterForm) {
      if (filterForm[key] !== '') {
        query[key] = filterForm[key];
      }
    }
    window.location.href = `/?${toQuery(query)}`;
  }

  function onEnterSaveFilter(e) {
    if (e.keyCode === 13) {
      saveFilter();
    }
  }

  function onFormHandler(e) {
    const form = {...filterForm};
    form[e.target.name] = e.target.value;
    let query = parseQuery(window.location.search);
    query = {
      ...query,
      ...form
    };
    setFilterForm(query);
  }

  function switchAutoload(e) {
    if (e.target.checked) {
      interval = setInterval(async () => {
        let query = parseQuery(window.location.search);
        await getLogs(dispatch, query);
      }, 1000);
      setIsAutoLoad(true);
    } else {
      clearInterval(interval);
      setIsAutoLoad(false);
    }
  }

  return (
    <>
      <div className="filter">
        <b>Filters</b>
        <div className="form-item">
          <input
            className="filter-input"
            placeholder="Type" 
            name="type" 
            value={filterForm.type || ''} 
            onChange={onFormHandler}
            onKeyUp={onEnterSaveFilter}
            />
        </div>
        <div className="form-item">
          <input
            className="filter-input"
            placeholder="Header" 
            name="header" 
            value={filterForm.header || ''} 
            onChange={onFormHandler}
            onKeyUp={onEnterSaveFilter}
            />
        </div>
        <div className="form-item">
          <input
            className="filter-input"
            placeholder="Project" 
            name="project" 
            value={filterForm.project || ''} 
            onChange={onFormHandler}
            onKeyUp={onEnterSaveFilter}
            />
        </div>
        <div className="form-item">
          <input
            className="filter-input"
            placeholder="Service" 
            name="service" 
            value={filterForm.service || ''} 
            onChange={onFormHandler}
            onKeyUp={onEnterSaveFilter}
            />
        </div>
        <div className="form-item">
          <input
            className="filter-input"
            placeholder="Message" 
            name="message" 
            value={filterForm.message || ''} 
            onChange={onFormHandler}
            onKeyUp={onEnterSaveFilter}
            />
        </div>
        <div className="filter-buttons">
          <button type="danger" className="filter-button fb-without-bg" onClick={clearFilter}>
            <Icon type="delete" />
          </button>
          <button type="primary" className="filter-button" onClick={saveFilter}>Save</button>
        </div>
      </div>
      <div className="autoload">
        <Checkbox checked={isAutoLoad} onChange={switchAutoload}>Autoload</Checkbox>
      </div>
    </>
  )
}

export default Filter;