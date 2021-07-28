import React from 'react';
import {connect} from 'react-redux';


const Status = ({appStatus}) => {

  const Loading = () => {
    return (
      <div className="container status">
        <div className="ui segment">
          <div className="ui active inverted dimmer status-spinner">
            <div className="ui text loader">Loading....</div>
          </div>
          <p></p>
        </div>
      </div>
    );
  };

  switch (appStatus) {
    case "loading":
      return <Loading />
    default:
      return <Loading />
  };
};

const mapStateToProps = ({appStatus}) => {
  return {
    appStatus
  };
};

export default connect(mapStateToProps)(Status);