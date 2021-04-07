import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {ping, changePage} from '../actions';
import LogIn from './LogIn';
import SignUp from './SignUp';


const App = ({login, page, ping}) => {
  useEffect(()=> {
    ping();
  }, []);

  if (!login) {
    if (page === 'signup') {
      return <SignUp />;
    }
    return <LogIn />;
  } 

  return <div>App y'all</div>;

};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    login: state.login,
    page: state.page
  }
}

export default connect(mapStateToProps, {
  ping,
  changePage
})(App);