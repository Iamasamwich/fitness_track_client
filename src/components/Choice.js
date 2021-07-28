import React from 'react';
import {connect} from 'react-redux';

import {changePage} from '../actions';

const Choice = ({changePage}) => {
  return (
    <div className="container">
      <div className="cust_half_height">
        <div 
          className="cust_button"
          onClick={() => changePage('createSession')}>
          Create A Session
        </div>
      </div>
      <div className="cust_half_height">
        <div 
          className="cust_button"
          onClick={() => changePage('viewData')}>
          View Session Data
        </div>
      </div>
    </div>
  );
};

export default connect(null, {changePage})(Choice);