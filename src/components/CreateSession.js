import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {DateInput} from 'semantic-ui-calendar-react';

import {changePage, createSession} from '../actions';

const CreateSession = ({changePage, createSession}) => {

  const twoDigits = num => {
    return num < 10 ?
      "0" + num :
      num;
  };
  const d = new Date();

  const [date, setDate] = useState(twoDigits(d.getDate()) + '-' + twoDigits((d.getMonth() + 1)) + '-' + d.getFullYear());
  const [dateError, setDateError] = useState('');
  const [distance, setDistance] = useState('');
  const [distanceError, setDistanceError] = useState('');
  const [secs, setSecs] = useState('');
  const [mins, setMins] = useState('');
  const [hours, setHours] = useState('');
  const [timeError, setTimeError] = useState('');
  const [weight, setWeight] = useState('');
  const [weightError, setWeightError] = useState('');
  const [route, setRoute] = useState('');
  const [routeError, setRouteError] = useState('');

  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    const re = /^\d{2}-\d{2}-\d{4}$/
    if (re.test(date)) {
      setDateError('');
    } else {
      setDateError('error');
    };
  }, [date]);

  useEffect(() => {
    const re = /^[0-9]{0,3}[.]{0,1}[0-9]{0,3}$/;
    if (!isNaN(distance) && distance > 0 && re.test(distance)) {
      setDistanceError('');
    } else {
      setDistanceError('error');
    };
  }, [distance]);

  useEffect(() => {
    if (
        (!isNaN(hours) || !isNaN(mins) || !isNaN(secs)) &&
        (Number(hours) >= 0 && Number(mins) >= 0 && Number(secs) >= 0) && 
        ((Number(hours) + Number(mins) + Number(secs)) > 0) &&
        (Number(hours) % 1 === 0) &&
        (Number(mins) % 1 === 0) &&
        (Number(secs) %1 === 0)
      ) {

        if (Number(mins) > 59) {
          const newMins = Number(mins) % 60;
          const newHours = (Number(mins) - newMins) / 60;
          setHours((Number(hours) + newHours).toString());
          setMins(newMins.toString());
        };

        if (Number(secs) > 59) {
          const newSecs = Number(secs) % 60;
          const newMins = (Number(secs) - newSecs) / 60;
          setMins((Number(mins) + newMins).toString());
          setSecs(newSecs.toString());
        };
        setTimeError('');
      } else {
        setTimeError('error');
      };
  }, [hours, mins, secs]);

  useEffect(() => {
    if (!isNaN(weight) && weight) {
      setWeightError('');
    } else {
      setWeightError('error');
    };
  }, [weight]);

  useEffect(() => {
    if (route) {
      setRouteError('');
    } else {
      setRouteError('error');
    }
  }, [route]);

  useEffect(() => {
    if (dateError || distanceError || timeError || weightError || routeError) {
      setAnyError(true);
    } else {
      setAnyError(false);
    };
  }, [dateError, distanceError, timeError, weightError, routeError]);

  const formSubmit = (e) => {
    e.preventDefault();
    if (anyError) {
      return;
    };
    createSession({date, distance, hours, mins, secs, weight, route});
  };

  const showSubmit = () => {
    return anyError === false
    ? (
      <button
        className="ui button positive"
        type="submit">
          Add Session!
        </button>
    )
    :null;
  };

  const handleDateChange = (e, {name, value}) => {
    setDate(value);
  };

  return (
    <div className="ui container">
      <form
        className="ui form"
        onSubmit={formSubmit}>

          <div className={`field ${dateError}`}>
            <label>Session Date</label>
            <DateInput
              popupPosition='bottom left'
              name="date"
              placeholder="Date"
              value={date}
              autoComplete="off"
              onChange={handleDateChange}
              closable={true}
            />
          </div>

          <div className={`field ${distanceError}`}>
            <label>Distance (km.mmm)</label>
            <input
              type="number"
              placeholder="km.mm"
              value={distance}
              onChange={e => setDistance(e.target.value)} />
          </div>

          <div className={`field time-field ${timeError}`}>
            <label>Session Duration</label>
            <input 
              className="time-input" 
              type="number"
              placeholder="hh"
              value={hours}
              onChange={e => setHours(e.target.value)} />
            <span>h</span>
            <input 
              className="time-input" 
              type="number"
              placeholder="mm"
              value={mins}
              onChange={e => setMins(e.target.value)} />  
            <span>m</span>
            <input 
              className="time-input" 
              type="number"
              placeholder="ss"
              value={secs}
              onChange={e => setSecs(e.target.value)} />  
            <span>s</span>
          </div>

          <div className={`field ${weightError}`}>
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="kg"
              value={weight}
              onChange={e => setWeight(e.target.value)} />
          </div>

          <div className={`field ${routeError}`}>
            <label>Route</label>
            <input
              placeholder="JBBL and back"
              value={route}
              onChange={e => setRoute(e.target.value)} />
          </div>

          {showSubmit()}

          <button 
            className="ui button red"
            onClick={() => changePage('login')}>
              Cancel
          </button>

        </form>
    </div>
  )
};

export default connect(null, {changePage, createSession})(CreateSession);