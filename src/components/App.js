import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {ping, changePage, logout} from '../actions';
import NavBar from './NavBar';
import LogIn from './LogIn';
import SignUp from './SignUp';



const App = ({login, page, ping, logout}) => {

  useEffect(()=> {
    ping();
  }, []);

  const unlogged = () => {
    if (page === 'signup') {
      return (
        <SignUp />
      );
    };
    return <LogIn />;
  };

  const logged = () => {
    return (
      <div style={{paddingTop: '30px'}}>
        App...
        <button onClick={() => logout()}>Log out</button>
      </div>
    );
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



  // if (!login) {
  //   if (page === 'signup') {
  //     return (
  //       <Fragment>
  //         <NavBar />
  //         <SignUp />
  //       </Fragment>
  //     );
  //   }
  //   return (
  //     <Fragment>
  //       <NavBar />
  //       <LogIn />
  //     </Fragment>
  //   );
  // } 

  // return (
  //   <Fragment>
  //     <NavBar />
  //     App y'all
  //   </Fragment>
  //   );

};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    page: state.page
  }
}

export default connect(mapStateToProps, {
  ping,
  changePage,
  logout
})(App);