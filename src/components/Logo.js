import React from 'react';

const Logo = () => {
  return (
    <div id='logo-container'>
      <h1>Cycle Tracker</h1>
      <div id="logo-wheel" className="wheel">
        <div className="logo-spokes" id="logo-spokes1" />
        <div className="logo-spokes" id="logo-spokes2" />
        <div className="logo-spokes" id="logo-spokes3" />
        <div className="logo-spokes" id="logo-spokes4" />
      </div>
    </div>
  );
};

export default Logo;
