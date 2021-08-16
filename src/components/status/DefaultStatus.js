import React from 'react';
import {connect} from 'react-redux';
import {clearError, changePage} from '../../actions';

const DefaultStatus = ({clearError, changePage, status}) => {

  const containerClicked = e => {
    e.preventDefault();
    changePage('home');
    clearError();
  };

  const showError = () => {
    switch (status) {
      case 401:
        return "Login Details Incorrect :("
      case 406:
        return "Unacceptable Inputs :("
      case 409:
        return "Duplication..."
      case 500:
        return "It looks like the server caught fire :("
      default:
        return "Non-specific errors :("
    };
  };

  return (
    <div className="container status" onClick={containerClicked}>
      <div className="ui segment">
        <div className="status-field">
          <h2>Womp womp!</h2>
        </div>
        <div className="status-field">
          <h2>{showError()}</h2>
        </div>
        <div className="status-field">
          <p>*touch anywhere else to dismiss...*</p>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {clearError, changePage})(DefaultStatus);