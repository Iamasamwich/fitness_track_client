import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {changePage, createSession} from '../actions';

const CreateSession = ({changePage, createSession}) => {

  const [date, setDate] = useState('2021-05-18');
  const [dateError, setDateError] = useState('');
  const [distance, setDistance] = useState('18.3');
  const [distanceError, setDistanceError] = useState('');
  const [time, setTime] = useState('2664');
  const [timeError, setTimeError] = useState('');
  const [weight, setWeight] = useState('73');
  const [weightError, setWeightError] = useState('');
  const [route, setRoute] = useState('Norths RFC');
  const [routeError, setRouteError] = useState('');
  const [notes, setNotes] = useState('so... tired....');
  const [notesError, setNotesError] = useState('');

  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    const re = /^\d{4}-\d{2}-\d{2}$/
    if (re.test(date)) {
      setDateError('');
    } else {
      setDateError('error');
    };
  }, [date]);

  useEffect(() => {
    if (!isNaN(distance) && distance > 0) {
      setDistanceError('');
    } else {
      setDistanceError('error');
    };
  }, [distance]);

  useEffect(() => {
    if (!isNaN(time) && time > 0) {
      setTimeError('');
    } else {
      setTimeError('error');
    };
  }, [time]);

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
    if (notes.length >= 1) {
      setNotesError('');
    } else {
      setNotesError('error');
    };
  }, [notes]);

  useEffect(() => {
    if (dateError || distanceError || timeError || weightError || routeError || notesError) {
      setAnyError(true);
    } else {
      setAnyError(false);
    };
  }, [dateError, distanceError, timeError, weightError, routeError, notesError]);

  const formSubmit = (e) => {
    e.preventDefault();
    if (anyError) {
      console.log('errors, bailing...');
      return;
    };
    console.log('form submitted');
    createSession({date, distance, time, weight, route, notes});
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

  return (
    <div className="ui container">
      <form
        className="ui form"
        onSubmit={formSubmit}>

          <div className={`field ${dateError}`}>
            <label>Session Date (yyyy--mm-dd)</label>
            <input
              placeholder="yyyy-mm-dd"
              value={date}
              onChange={e => setDate(e.target.value)} />
          </div>

          <div className={`field ${distanceError}`}>
            <label>Distance (km.mmm)</label>
            <input
              placeholder="km.mm"
              value={distance}
              onChange={e => setDistance(e.target.value)} />
          </div>

          <div className={`field ${timeError}`}>
            <label>Session duration (seconds)</label>
            <input
              placeholder="Length in seconds"
              value={time}
              onChange={e => setTime(e.target.value)} />
          </div>

          <div className={`field ${weightError}`}>
            <label>Weight (kg)</label>
            <input
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

          <div className={`field ${notesError}`}>
            <label>Session Notes</label>
            <input
              placeholder="Lots of magpies today...."
              value={notes}
              onChange={e => setNotes(e.target.value)} />
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