import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');
  const [confPword, setConfPword] = useState('');
  const [errors, setErrors] = useState({
    name: 'error',
    email: 'error',
    pword: 'error',
    confPword: 'error'
  });

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
    if (pword.length > 0) {
      setErrors({...errors, pword: ''});
    } else {
      setErrors({...errors, pword: 'error'});
    };
  }, [pword]);

  const showConf = () => {
    return pword.length === 0 ?
      null :
      <div className={`field ${errors.name}`}>
        <label>Confirm password</label>
        <input
          placeholder="Confirm password"
          type="password"
          value={confPword}
          onChange={e => setConfPword(e.target.value)} />
      </div>
  }

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
      </div>
    </div>
  );
};

export default connect()(SignUp);


// !req.body.email ||
// !req.body.name ||
// !req.body.pword