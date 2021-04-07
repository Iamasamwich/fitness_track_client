import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {signUp} from '../actions';

const SignUp = ({signUp}) => {

  const [name, setName] = useState('Sam');
  const [email, setEmail] = useState('sam@sam.com');
  const [pword, setPword] = useState('password');
  const [confPword, setConfPword] = useState('password');
  const [errors, setErrors] = useState({
    name: 'error',
    email: 'error',
    pword: 'error',
    confPword: 'error'
  });
  const [anyError, setAnyError] = useState(true);

  useEffect(() => {
    if (name.length > 0) {
      setErrors({...errors, name: ''});
    } else {
      setErrors({...errors, name: 'error'});
    };
  }, [name]);

  useEffect(() => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.toLowerCase())) {
      setErrors({...errors, email: ''});
    } else {
      setErrors({...errors, email: 'error'});
    };
  }, [email]);

  useEffect(() => {
    if (pword.length > 0 && pword === confPword) {
      setErrors({...errors, pword: '', confPword: ''});
    } else if (pword.length > 0 && pword !== confPword) {
      setErrors({...errors, pword: '', confPword: 'error'});
    } else if (pword.length <= 0) {
      setErrors({...errors, pword: 'error', confPword: 'error'});
      setConfPword('');
    };
  }, [pword, confPword]);

  useEffect(() => {
    for (const property in errors) {
      if (errors[property] === 'error') {
        setAnyError(true);
        if (anyError === false) {
          setAnyError(true);
        }
        return;
      };
    };
    setAnyError(false)
  }, [errors])

  const showConf = () => {
    return errors.pword === ''
      ? (   
          <div className={`field ${errors.confPword}`}>
            <label>Confirm password</label>
            <input
              placeholder="Confirm password"
              type="password"
              value={confPword}
              onChange={e => setConfPword(e.target.value)} />
          </div>
        )
      : null;
  };

  const showSubmit = () => {
    return anyError === false
      ? (
        <button
          type="submit"
          onClick={signUpClicked}>
            Sign Up!
        </button>
      )
      : null;
  };

  const signUpClicked = e => {
    e.preventDefault();
    if (anyError) {
      return;
    };
    signUp({name, email, pword});
  };

  return (
    <div className="ui container">
      <div className="ui form">
        <div className={`field ${errors.name}`}>
          <label>What should we call you?</label>
          <input 
            placeholder="Freddles"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)} />
        </div>
        <div className={`field ${errors.email}`}>
          <label>Your email?</label>
          <input 
            placeholder="winifred@email.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={`field ${errors.pword}`}>
          <label>Password</label>
          <input 
            placeholder="Password"
            type="password"
            value={pword}
            onChange={e => setPword(e.target.value)} />
        </div>
        {showConf()}
        {showSubmit()}
      </div>
    </div>
  );
};

export default connect(null, {signUp})(SignUp);


// !req.body.email ||
// !req.body.name ||
// !req.body.pword