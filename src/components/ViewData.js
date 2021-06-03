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
  };

  const renderGraph = (display) => {
    let left, right;
    switch (display) {
      case "distTime":
        left = {datakey: "distance", label: "Distance (km)"};
        right = {dataKey: "time", label: "Time (s)"};
        break;
      case "distSpeed":
        left = {dataKey: "distance", label: "Distance (km)"};
        right = {dataKey: "speed", label: "Avg. Speed (km/h)"};
        break;
      case "distWeight":
        left = {dataKey: "distance", label: "Distance (km)"};
        right = {dataKey: "weight", label: "Weight (kg)"};
        break;
      default:
        left = "distance";
        right = "time";
        break;
    };


    console.log(fetchedSessions);

    const timeTick = (time) => {
      const h = Math.floor(time / 3600);
      const m = Math.floor((time - (h * 3600)) / 60);
      return `${h}h ${m}m`;
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


{/* Distance */}
          <YAxis
            padding={{top: 10, bottom: 10}}
            yAxisId="left"
            orientation="left"
            type="number"
            domain={['auto', 'auto']}
            label={{value: 'Distance (km)', angle: -90, position: 'innerLeft', fill: 'rgba(0, 0, 255, 1)'}} />
          
          <Line
            dataKey="distance"
            yAxisId="left"
            type="monotone"
            stroke="#0000FF"
          />

          <YAxis 
            padding={{top: 10, bottom: 10}}
            yAxisId="right"
            orientation="right"
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={timeTick}
            label={{value: "Time (s)", angle: 90, position: 'innerRight', fill: 'rgba(255,0,0,1)'}} />
          <Line
            dataKey="time"
            yAxisId="right"
            type="monotone"
            stroke="#FF0000"/>

          {/* <YAxis 
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
            stroke='#00ff00' /> */}
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