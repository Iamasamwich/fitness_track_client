import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {ping, changePage, logout} from '../actions';
import NavBar from './NavBar';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Choice from './Choice';
import PlaceHolder from './PlaceHolder';
import CreateSession from './CreateSession';
import ViewData from './ViewData';

const App = ({login, page, ping}) => {

  useEffect(()=> {
    ping();
  }, [ping]);

  const unlogged = () => {
    switch (page) {
      case 'signup':
        return <SignUp />;
      default: 
        return <LogIn />;
    }
  };

  const logged = () => {
    switch (page) {
      case 'home':
        return <Choice />;
      case 'createSession':
        return <CreateSession />;
      case 'viewData':
        return <ViewData />;
      case 'placeHolder':
        return <PlaceHolder />
      default: 
        return <Choice />;
    }
  }

  return (
    <Fragment>
      <NavBar />
      {!login ?
        unlogged() :
        logged()
      }
    </Fragment>
  );

};

const mapStateToProps = ({login, page}) => {
  return {
    login,
    page
  }
}

export default connect(mapStateToProps, {
  ping,
  changePage,
  logout
})(App);