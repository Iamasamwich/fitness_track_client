import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {signUp, changePage} from '../actions';

const SignUp = ({signUp, changePage}) => {

  const [name, setName] = useState('Sam');
  const [email, setEmail] = useState('sam@sam.com');
  const [pword, setPword] = useState('password');
  const [confPword, setConfPword] = useState('password');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    pword: '',
    confPword: ''
  });
  const [anyError, setAnyError] = useState(false);

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
          className="ui button positive"
          type="submit">
            Sign Up!
        </button>
      )
      : null;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (anyError) {
      console.log('errors, bailing');
      return;
    };
    signUp({name, email, pword});
  }

  return (
    <div className="ui container">
      <form 
        className="ui form"
        onSubmit={formSubmit}>
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
        <button
          className="ui button red"
          onClick={() => changePage('login')}>
            Cancel
          </button>
      </form>
    </div>
  );
};

export default connect(null, {signUp, changePage})(SignUp);