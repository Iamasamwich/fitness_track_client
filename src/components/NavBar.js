import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions';

const NavBar = ({login, page}) => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onBodyClick = e => {
      console.log(e.target);
    };
      
    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    }
  }, []);

  const menuClicked = e => {
    console.log(e.target);
  }

  return (
    <div className="navbar">
      <div
        id="menu"
        className="ui dropdown">
        <i className="bars icon large" />
        <div className="menu transition visible active">
          <div className="item">Trees</div>
          <div className="item">Dogs</div>
        </div>
      </div>
      {login ?
        <div>should be working</div> :
        null}
    </div>
  )
};

const mapStateToProps = ({login, page}) => {
  return {
    login,
    page
  }
}

export default connect(mapStateToProps, {logout})(NavBar);

