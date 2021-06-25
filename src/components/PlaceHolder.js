import React from 'react';
import {connect} from 'react-redux';
import {changePage} from '../actions';

const PlaceHolder = ({changePage}) => {
  return (
    <div style={{textAlign: 'center', paddingTop: '50px'}}>
      <h3>
        I bet you thought this page would do something, huh?
      </h3>
      <button
        className='ui button green'
        onClick={() => changePage('home')}
      >Home</button>
    </div>
  );
};

export default connect(null, {changePage})(PlaceHolder);