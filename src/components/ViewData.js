import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {ResponsiveContainer, ComposedChart, LineChart, Line, CartesianGrid, Legend, XAxis, YAxis, Label, Tooltip} from 'recharts';

import {getMonthSessions, getAllSessions} from '../actions';

const ViewData = ({sessions, getMonthSessions, getAllSessions}) => {

  const [fetchedSessions, setFetchedSessions] = useState([]);
  const [display, setDisplay] = useState('distTime');

  useEffect(() => {
    getMonthSessions();
  }, [getMonthSessions]);

  // useEffect(() => {
  //   getAllSessions();
  // }, [getAllSessions]);

  useEffect(() => {
    sessions.forEach(session => {
      session.unix = new Date(session.date).getTime();
    });
    setFetchedSessions(sessions);
  }, [sessions])

  const unixToDate = unix => {
    const d = new Date(unix);
    const arr = [d.getDate(), d.getMonth() + 1, d.getFullYear()];
    return arr.join('-');
  }

  const renderGraph = (display) => {
    let left, right;
    switch (display) {
      case "distTime":
        left = "distance";
        right = "time";
        break;
      case "distSpeed":
        left = "distance";
        right = "speed";
        break;
      case "distWeight":
        left = "distance";
        right = "weight";
        break;
      default:
        left = "distance";
        right = "time";
        break;
    };


    return (
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={fetchedSessions}
          margin={{top: 10, right: 10, bottom: 100, left: 10}}>
          <CartesianGrid />
          <Tooltip />

          <XAxis 
            dataKey="unix" 
            scale="time" 
            domain={['auto', 'auto']}
            tickFormatter={unix => unixToDate(unix)}
            type="number"
            interval={0}
            dy={30}
            angle={85} 
            padding={{left: 10, right: 10}} />

          <YAxis 
            padding={{top: 10, bottom: 10}}
            yAxisId="left"
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={time => Math.abs(time)}
            label={{value: 'time (s)', angle: -90, position: 'insideLeft'}} />
          <Line
            dataKey="time"
            yAxisId="left"
            type="monotone"
            stroke="#FF0000"/>

          <YAxis 
            yAxisId="right"
            padding={{top: 10, bottom: 10}}
            orientation='right'
            interval="preserveStartEnd"
            tickCount={3}
            label={{value: "weight (kg)", angle: 90, position: "insideRight"}}
            domain={["auto", "auto"]}
            />

          <Line
            dataKey="weight"
            yAxisId='right'
            type='monotone'
            stroke='#00ff00' />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  if (fetchedSessions.length === 0) {
    return (
      <div>Loading</div>
    )
  } else {
    console.log(display);
    return (
      <div>
        {renderGraph(display)}
        <div style={{height: "150px", backgroundColor: '#ddd'}}>
          <div>
            <button 
              className="ui button green"
              onClick={e => setDisplay('distTime')}>
              Distance Time
            </button>
            <button 
              className="ui button green"
              onClick={e => setDisplay('distSpeed')}>
              Distance Speed
            </button>
            <button
              className="ui button green"
              onClick={e => setDisplay('distWeight')}>
              Distance Weight
            </button>
          </div>

        </div>
      </div>
    );
  }
};

const mapStateToProps = ({sessions}) => {
  return {
    sessions
  }
};



export default connect(mapStateToProps, {getMonthSessions, getAllSessions})(ViewData);