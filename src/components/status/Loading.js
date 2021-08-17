import React from 'react';

const Loading = () => {
  return (
    <div className="container status">
      <div className="ui segment">
        <div id="loading">
          <div id="loading-pump">
            <div id='loading-pump-body' />
            <div id='loading-pump-handle' />
            <div id='loading-pump-base' />
            <svg id='loading-pump-hose' width='345' height='100'>
              <path d="M -5 5 C 100 100, 100 80, 150 70 S 320 20, 340 90" stroke="red" fill="transparent" strokeWidth="10" />
            </svg>
          </div>
          <div id="loading-wheel" className="wheel">
            <div className="logo-spokes" id="logo-spokes1" />
            <div className="logo-spokes" id="logo-spokes2" />
            <div className="logo-spokes" id="logo-spokes3" />
            <div className="logo-spokes" id="logo-spokes4" />
            <div id="loading-leak">
              <div className="loading-leak-air" id="loading-leak1" />
              <div className="loading-leak-air" id="loading-leak2" />
              <div className="loading-leak-air" id="loading-leak3" />
            </div>
          </div>
        </div>
        <div className="status-field">
          <h2>Loading
            <span className="loading-dot" id="loading-dot1">.</span>
            <span className="loading-dot" id="loading-dot2">.</span>
            <span className="loading-dot" id="loading-dot3">.</span>
          </h2>
          <h4>This might take a few seconds for the server to start...</h4>
        </div>
      </div>
    </div>
  )
};

export default Loading;