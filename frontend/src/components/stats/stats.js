import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../state/useGlobalState';
import { Col, Row } from 'antd';
import { getStats } from '../../services/statsService';
import './stats.scss';

function Stats() {
  const [{ stats }, dispatch] = useGlobalState();

  useEffect(() => {
    getStats(dispatch);
  }, []);

  return (
    <>
      {stats ? (
        <div className="stats">
        <Row>
          <Col span={8} className="stats-col">
            <h1>Today</h1>
            <b>All:</b><span>{stats.today.all}</span><br/>
            <b>Errors:</b><span>{stats.today.errors}</span>
          </Col>
          <Col span={8} className="stats-col stats-col-border">
            <h1>7 Days</h1>
            <b>All:</b><span>{stats.week.all}</span><br/>
            <b>Errors:</b><span>{stats.week.errors}</span>
          </Col>
          <Col span={8} className="stats-col">
            <h1>30 Days</h1>
            <b>All:</b><span>{stats.month.all}</span><br/>
            <b>Errors:</b><span>{stats.month.errors}</span>
          </Col>
        </Row>
      </div>
      ) : null}
    </>
  );
}

export default Stats;