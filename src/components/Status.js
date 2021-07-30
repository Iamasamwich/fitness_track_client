import React from 'react';
import {connect} from 'react-redux';
import Loading from './status/Loading';
import FourOhFour from './status/FourOhFour';
import DefaultStatus from './status/DefaultStatus';


const Status = ({appStatus, page}) => {

  switch (appStatus) {
    case "loading":
      return <Loading />
    case 404:
      return <FourOhFour page={page} />
    default:
      return <DefaultStatus status={appStatus} />
  };
};

const mapStateToProps = ({appStatus, page}) => {
  return {
    appStatus,
    page
  };
};

export default connect(mapStateToProps)(Status);