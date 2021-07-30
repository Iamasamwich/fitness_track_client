import React from 'react';

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

export default Loading;