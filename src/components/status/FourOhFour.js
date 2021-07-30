import React from 'react';
import {connect} from 'react-redux';
import {changePage, fetchChange, clearError} from '../../actions';

const FourOhFour = ({clearError, changePage, page, fetchChange}) => {

  const containerClicked = e => {
    e.preventDefault();
    if (e.target.classList[0] === 'fakeLink') {
      return;
    } else {
      clearError();
      if (page === 'viewData') {
        changePage('home');
      };
    };
  }

  return (
    <div className="container status"
      onClick={containerClicked}
    >
      <div className="ui segment">
        <div className="status-field">
          <h2>Womp womp!</h2>
        </div>
        {page === "viewData" ?
          <div className="status-field">
            <h2>
            There are no sessions to view...
            </h2>
            <h2>
              <span 
                className="fakeLink"
                onClick={() => changePage("createSession")}>
                  Add a new session
              </span>
              <br />
              or 
              <br />
              <span
                className="fakeLink"
                onClick={() => fetchChange(true)}>
                  get all session data
              </span>
            </h2>
          </div> :
          null
        }
        <div className="status-field">
          <p>*touch anywhere else to dismiss...*</p>
        </div>
      </div>
    </div>
  )
};


export default connect(null, {changePage, fetchChange, clearError})(FourOhFour);