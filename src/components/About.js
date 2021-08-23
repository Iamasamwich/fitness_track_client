import React from 'react';
import {connect} from 'react-redux';
import {changePage} from '../actions';

const About = ({changePage}) => {
  return (
    <div className='ui container about'>
      <h2>About Cycle Tracker</h2>
      <p>
        Hi there, and welcome to this app designed to track you cycling and fitness progression.
      </p>
      <p>
        After you have created and account and/or logged in, click "Create A Session" to add some data.</p>
      <p>
        You will need to enter the date of your session, the distance you rode, the session duration in hours, minutes and seconds, your weight, and a quick blurb about the route you took (eg. "Work and back").
      </p>
      <p>
        Once you have entered at least one session, you can go back to the main screen and click "View Session Data" to see a graph of your sessions over time.
      </p>
      <p>
        The default setting is to see the last 30 days worth of sessions, but you can see all of your data by clicking "Show All".
      </p>
      <p>
        The default graph is time on the X-axis, Distance on the left Y-axis (blue), and Average Speed on the right Y-axis (red). You can change right Y-axis to show your total time or weight progression over time instead of speed.
      </p>
      <hr/>
      <p>
        <span>This App was created by </span>
        <a href="mailto:sam@iamasamwich.com" target="_blank" rel="noreferrer">Sam Humphreys</a>
        <span>, using </span>
        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a>
        <span> and </span>
        <a href="https://redux.js.org" target="_blank" rel="noreferrer">Redux</a>
        <span>, </span>
        <a href="https://semantic-ui.com/" target="_blank" rel="noreferrer">Semantic UI</a>
        <span>, and </span>
        <a href="https://recharts.org" target="_blank" rel="noreferrer">Recharts</a>
      </p>

      <button
        className='ui button green'
        onClick={() => changePage('home')}
      >Home</button>
    </div>
  );
};

export default connect(null, {changePage})(About);