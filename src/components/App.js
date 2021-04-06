import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {ping} from '../actions';
import LogIn from './LogIn';


const App = ({login, ping}) => {
  useEffect(()=> {
    ping();
  }, []);

  if (!login) {
    return <LogIn />;
  } else {
    return <div>App y'all...</div>
  }

};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, {
  ping
})(App);