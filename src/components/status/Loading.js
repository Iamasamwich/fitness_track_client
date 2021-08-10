import React from 'react';

const Loading = () => {
  return (
    <div className="container status">
      <div className="ui segment">
        <div id="loading">
          <div id="loading-pump">
            <div id='loading-body' />
            <div id='loading-handle' />
            <div id='loading-base' />
            <svg id='loading-hose' width='345' height='100'>
              <path d="M -5 5 C 100 100, 100 80, 150 70 S 300 20, 345 110" stroke="red" fill="transparent" strokeWidth="10" />
            </svg>
          </div>
          <div id="loading-wheel">
            <div className="loading-spokes" id="loading-spokes1" />
            <div className="loading-spokes" id="loading-spokes2" />
            <div className="loading-spokes" id="loading-spokes3" />
            <div className="loading-spokes" id="loading-spokes4" />
            <div className="loading-leak" id="loading-leak1" />
            <div className="loading-leak" id="loading-leak2" />
            <div className="loading-leak" id="loading-leak3" />
          </div>
        </div>
        <div className="status-field">
          <h2>Loading
            <span className="loading-dot" id="loading-dot1">.</span>
            <span className="loading-dot" id="loading-dot2">.</span>
            <span className="loading-dot" id="loading-dot3">.</span>
          </h2>
        </div>
      </div>
    </div>
  )
};

export default Loading;