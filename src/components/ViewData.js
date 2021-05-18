import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {getMonthSessions} from '../actions';

const ViewData = ({sessions, getMonthSessions}) => {

  const [fetchedSessions, setFetchedSessions] = useState([]);

  useEffect(() => {
    getMonthSessions();
  }, [getMonthSessions]);

  useEffect(() => {
    setFetchedSessions(sessions)
  }, [sessions])

  if (fetchedSessions.length === 0) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        {fetchedSessions.map(session => {
          return <div key={session.id}>{session.id}</div>
        })}
      </div>)
  };
};

const mapStateToProps = ({sessions}) => {
  return {
    sessions
  }
};



export default connect(mapStateToProps, {getMonthSessions})(ViewData);