import React from 'react';
import {connect} from 'react-redux';
import {changePage} from '../actions';

const ViewDataLoading = ({changePeriod, changePage}) => {
  return (
    <div className="ui container">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">
          <p>Loading<br /><br />There might not be any sessions...
            <br />
            <span 
              className="fakeLink"
              onClick={() => changePage("createSession")}>
                try adding some
            </span>
            <br />
             or 
            <br />
            <span
              className="fakeLink"
              onClick={() => changePeriod("all")}>
                get all session data
            </span>
          </p>
        </div>
      </div>
    </div>
  )
};


export default connect(null, {changePage})(ViewDataLoading);