import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {logout, changePage} from '../actions';

const NavBar = ({login, logout, page, changePage}) => {
  const [menu, setMenu] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const menuClicker = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      }
      setMenu(false);
    };
    document.body.addEventListener('click', menuClicker);
    return () => {
      document.removeEventListener('click', menuClicker);
    }
  }, []);

  return (
    <div className="navbar" id="navbar">
      {login ?
        <div>
          <i 
            className="home icon large"
            onClick={()=> changePage('login')} />
        </div>
      : null}
      <div
        ref={ref}
        className="ui dropdown"
        onClick={() => setMenu(!menu)}>
        <i className="bars icon large" />
        <div 
          className={`cust_menu menu transition ${menu ? 'visible active' : ''}`}>
          {/* {login ?
            <div 
            className="item"
            onClick={() => changePage('placeHolder')}>
                Profile
            </div>
            :
            null} */}
          <div 
            className="item"
            onClick={() => changePage('about')}>
              About
          </div>
          {login ?
            <div 
              className="item"
              onClick={() => logout()}>
              Log Out
            </div>
            :
            null}
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({login, page}) => {
  return {
    login,
    page
  }
};

export default connect(mapStateToProps, {logout, changePage})(NavBar);

