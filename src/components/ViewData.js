import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

import {getMonthSessions, getAllSessions} from '../actions';

const ViewData = ({sessions, getMonthSessions, getAllSessions, fetchAll}) => {

  const [fetchedSessions, setFetchedSessions] = useState([]);
  const [display, setDisplay] = useState('speed');
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    if (period === 'month') {
      getMonthSessions();
    } else {
      getAllSessions();
    };
  }, [getMonthSessions, getAllSessions, period]);

  useEffect(() => {
    if (fetchAll === true) {
      setPeriod('all');
    }
  }, [fetchAll]);

  useEffect(() => {
    if (sessions) {
      sessions.forEach(session => {
        session.unix = new Date(session.date).getTime();
      });
    };
    setFetchedSessions(sessions);
  }, [sessions])

  const unixToDate = unix => {
    const d = new Date(unix);
    const arr = [d.getDate(), d.getMonth() + 1, d.getFullYear()];
    return arr.join('-');
  };

  const msToHM = (time) => {
    const h = Math.floor(time/3600);
    const m = Math.floor((time - (h * 3600)) / 60);
    return `${h}h ${m}m`;
  };

  const renderGraph = (display) => {
    let right;
    const time = {
      dataKey: "time", 
      label: "Time (s)",
      tickCount: 3,
      tickFormatter: (time) => {
        return msToHM(time);
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

    const tickDates = [fetchedSessions[0].unix, fetchedSessions[fetchedSessions.length -1].unix];

    const toolTipContent = ({active, payload, label}) => {
      if (active && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="custom-tooltip">
            <p className="label">{`Date: ${unixToDate(data.unix)}`}</p>
            <p className="desc">{`Distance: ${data.distance}km`}</p>
            <p className="desc">{msToHM(data.time)}</p>
            <p className="desc">{`Avg. Speed: ${data.speed}km/h`}</p>
            <p className="desc">{`Route: ${data.route}`}</p>
          </div>
        );
      };
      return null;
    };

    return (
      <ResponsiveContainer width="100%" height={430}>
        <LineChart
          data={fetchedSessions}
          margin={{top: 10, right: 10, bottom: 100, left: 10}}>
          <CartesianGrid />
          <Tooltip content={toolTipContent} />
          <XAxis 
            dataKey="unix" 
            scale="time" 
            domain={['auto', 'auto']}
            tickFormatter={unix => unixToDate(unix)}
            ticks={[tickDates[0], tickDates[1]]}
            interval="preserveStartEnd"
            type="number"
            dy={30}
            angle={45} 
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

  const renderButtons = () => {
    const setColour = (disp) => {
      return disp === display ? "blue" : "green";
    };

    return (
      <div className="graph-bottom">
        <div className="graph-buttons">
          <button 
            className={`ui button ${setColour('speed')}`}
            onClick={() => setDisplay('speed')}>
            Speed
          </button>
          <button 
            className={`ui button ${setColour('time')}`}
            onClick={() => setDisplay('time')}>
            Time
          </button>
          <button
            className={`ui button ${setColour('weight')}`}
            onClick={() => setDisplay('weight')}>
            Weight
          </button>
        </div>
        <div>
          {
            period === 'month' ?
            <button
              className="ui button green"
              onClick={()=> setPeriod('all')}>
              Show All
            </button>
            :
            <button
            className="ui button green"
            onClick={() => setPeriod('month')}>
              Show 30 days
            </button>
          }
        </div>
      </div>
    );
  };

  if (!fetchedSessions || fetchedSessions.length === 0) {
    return null;
  } else {
    console.log(display);
    return (
      <div className="ui container data">
        <h2>Your session data:</h2>
        {renderGraph(display)}
        {renderButtons()}
      </div>
    );
  }
};

const mapStateToProps = ({sessions, fetchAll}) => {
  return {
    sessions,
    fetchAll
  }
};

export default connect(mapStateToProps, {getMonthSessions, getAllSessions})(ViewData);