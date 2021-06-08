import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {ResponsiveContainer, ComposedChart, LineChart, Line, CartesianGrid, Legend, XAxis, YAxis, Label, Tooltip} from 'recharts';

import {getMonthSessions, getAllSessions} from '../actions';

const ViewData = ({sessions, getMonthSessions, getAllSessions}) => {

  const [fetchedSessions, setFetchedSessions] = useState([]);
  const [display, setDisplay] = useState('speed');

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

  const renderButtons = () => {
    return (
      <div style={{height: "150px", backgroundColor: '#ddd'}}>
        <div>
          <button 
            className="ui button green"
            onClick={e => setDisplay('time')}>
            Time
          </button>
          <button 
            className="ui button green"
            onClick={e => setDisplay('speed')}>
            Speed
          </button>
          <button
            className="ui button green"
            onClick={e => setDisplay('weight')}>
            Weight
          </button>
        </div>
      </div>
    );
  };

  const renderGraph = (display) => {

    let right;

    const time = {
      dataKey: "time", 
      label: "Time (s)",
      tickCount: 3,
      tickFormatter: (time) => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time - (h * 3600)) / 60);
        return `${h}h ${m}m`;
      }
    };
    const speed = {
      dataKey: "speed", 
      label: "Avg. Speed (km/h)",
      tickCount: 5,
      tickFormatter: (speed) => {return speed;}
    };
    const weight = {
      dataKey: "weight", 
      label: "Weight (kg)",
      tickCount: 3,
      tickFormatter: (data) => {return data;}
    };
    switch (display) {
      case "time":
        right = time;
        break;
      case "speed":
        right = speed;
        break;
      case "weight":
        right = weight;
        break;
      default:
        right = time;
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

{/* distance on left axis */}
          <YAxis
            padding={{top: 10, bottom: 10}}
            yAxisId="left"
            orientation="left"
            type="number"
            domain={['auto', 'auto']}
            interval="preserveStartEnd"
            label={{value: 'Distance (km)', angle: -90, position: 'left', fill: 'rgba(0, 0, 255, 1)'}} />
          <Line
            dataKey="distance"
            yAxisId="left"
            type="monotone"
            stroke="#0000FF" />

{/* variable on right axis */}

          <YAxis
            padding={{top: 10, bottom: 10}}
            yAxisId="right"
            orientation="right"
            type="number"
            domain={['auto', 'auto']}
            tickCount={right.tickCount}
            tickFormatter={(data) => right.tickFormatter(data)}
            label={{value: right.label, angle: 90, position: 'right', fill: 'rgba(255, 0, 0, 1'}}
          />

          <Line
            dataKey={right.dataKey}
            yAxisId="right"
            type="monotone"
            stroke="#FF0000"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  if (fetchedSessions.length === 0) {
    return (
      <div>Loading</div>
    )
  } else {
    console.log(fetchedSessions);
    return (
      <div>
        {renderGraph(display)}
        {renderButtons()}
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