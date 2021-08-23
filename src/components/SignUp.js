import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {signUp, changePage} from '../actions';
import TermsAndConditions from './TermsAndConditions';

const SignUp = ({signUp, changePage}) => {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pword, setPword] = useState('');
  const [pwordError, setPwordError] = useState('');
  const [confPword, setConfPword] = useState('');
  const [confPwordError, setConfPwordError] = useState('');
  const [tandc, setTandc] = useState(false);
  const [tandcError, setTandcError] = useState('');
  const [anyError, setAnyError] = useState(false);
  const [viewTerms, setViewTerms] = useState(false);

  useEffect(() => {
    if (name) {
      setNameError('');
    } else {
      setNameError('error');
    };
  }, [name]);

  useEffect(() => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.toLowerCase())) {
      setEmailError('');
    } else {
      setEmailError('error');
    };
  }, [email]);

  useEffect(() => {
    if (pword && pword === confPword) {
      setPwordError('');
      setConfPwordError('');
    } else if (pword && pword !== confPword) {
      setPwordError('');
      setConfPwordError('error');
    } else if (!pword) {
      setPwordError('error');
      setConfPwordError('error');
      setConfPword('');
    };
  }, [pword, confPword]);

  useEffect(() => {
    if (tandc === true) {
      setTandcError('');
    } else {
      setTandcError('error');
    }
  }, [tandc]);

  useEffect(() => {
    if (nameError || emailError || pwordError || confPwordError || tandcError) {
      setAnyError(true)
    } else {
      setAnyError(false);
    };
  }, [nameError, emailError, pwordError, confPwordError, tandcError]);

  const showConf = () => {
    return !pwordError
      ? (   
          <div className={`field ${confPwordError}`}>
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

  const showTandc = () => {
    return (!nameError && !emailError && !pwordError && !confPwordError) ?
      <div className={`inline field ${tandcError}`}>
        <div className="ui checkbox">
          <input 
            type="checkbox"
            checked={tandc}
            onChange={e => {setTandc(!tandc)}} />
          <label>I have read and agree to the <span className="fakeLink" onClick={() => setViewTerms(true)}>Terms And Conditions</span></label>
        </div>
      </div>
    :
    null;
  }

  const showSubmit = () => {
    return !anyError
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
      return;
    };
    signUp({name, email, pword});
  }

  const tandcClicked = (bool) => {
    if (bool === true) {
      setTandc(true);
    };
    setViewTerms(false);
  };

  return (
    <div className="ui container">

      {viewTerms ? <TermsAndConditions readTandC={(bool) => tandcClicked(bool)} /> : null}

      <form 
        className="ui form"
        onSubmit={formSubmit}>

        <div className={`field ${nameError}`}>
          <label>What should we call you?</label>
          <input 
            placeholder="Freddles"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)} />
        </div>

        <div className={`field ${emailError}`}>
          <label>Your email?</label>
          <input 
            placeholder="winifred@email.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>

        <div className={`field ${pwordError}`}>
          <label>Password</label>
          <input 
            placeholder="Password"
            type="password"
            value={pword}
            onChange={e => setPword(e.target.value)} />
        </div>

        {showConf()}

        {showTandc()}

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