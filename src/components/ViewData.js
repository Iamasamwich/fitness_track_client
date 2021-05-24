import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {ResponsiveContainer, ComposedChart, LineChart, Line, CartesianGrid, Legend, XAxis, YAxis, Label, Tooltip} from 'recharts';

import {getMonthSessions} from '../actions';

const ViewData = ({sessions, getMonthSessions}) => {

  const [fetchedSessions, setFetchedSessions] = useState([]);

  useEffect(() => {
    getMonthSessions();
  }, [getMonthSessions]);

  useEffect(() => {
    setFetchedSessions(sessions);
  }, [sessions])

  if (fetchedSessions.length === 0) {
    console.log('no data');
    return (
      <div>Loading</div>
    )
  } else {
    console.log(fetchedSessions);
    return (

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={fetchedSessions}
          margin={{top: 10, right: 10, bottom: 10, left: 10}}>
          <CartesianGrid />
          <Legend />
          <Tooltip />
          
          <XAxis dataKey="date" padding={{left: 10, right: 10}} />
          <YAxis 
            yAxisId="left"
            domain={[dataMin => (Math.abs(dataMin*0.95)), dataMax => (Math.abs(dataMax*1.05))]}
            label={{value: 'time (s)', angle: -90, position: 'insideLeft'}} />
          <Line
            dataKey="time"
            yAxisId="left"
            type="monotone"
            stroke="#FF0000"/>

          <YAxis 
            yAxisId="right"
            orientation='right'
            label={{value: "weight (kg)", angle: 90, position: "insideRight"}}
            domain={['dataMin', 'dataMax']} />

          <Line
            dataKey="weight"
            yAxisId='right'
            type='monotone'
            stroke='#00ff00' />
        </LineChart>
      </ResponsiveContainer>
    );
  }
};

const mapStateToProps = ({sessions}) => {
  return {
    sessions
  }
};



export default connect(mapStateToProps, {getMonthSessions})(ViewData);