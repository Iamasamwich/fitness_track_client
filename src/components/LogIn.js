import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {login, changePage} from '../actions';

const LogIn = ({login, changePage}) => {

  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    pword: ''
  });
  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailOk = re.test(email.toLowerCase());
    
    if (emailOk && pword.length > 0) {
      setErrors({email: '', pword: ''});
    } else if (emailOk && pword.length === 0) {
      setErrors({email: '', pword: 'error'});
    } else if (!emailOk && pword.length > 0) {
      setErrors({email: 'error', pword: ''});
    } else {
      setErrors({email: 'error', pword: 'error'});
    };
  }, [email, pword]);

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
  }, [errors]);

  const onSubmit = e => {
    e.preventDefault();
    if (anyError === false) {
      login({email, pword});
    } else {
      return;
    };
  };
  
  const clickCreate = e => {
    e.preventDefault();
    console.log(e.target);
    changePage('signup');
  };

  return (
    <div className='ui container'>
      <form 
        className='ui form'
        onSubmit={onSubmit}
      >
        <div className={`field ${errors.email}`}>
          <label>Email:</label>
          <input
            type='text'
            name='email'
            placeholder='Email...'
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={`field ${errors.pword}`}>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={pword}
            onChange={e => setPword(e.target.value)} />
        </div>
        <button className={`ui button ${anyError ? '' : 'positive'}`} type="submit">
          Log In
        </button>
      </form>
      <div className="content">
        <p 
          className="fakeLink" 
          onClick={clickCreate}>
          Create an account
        </p>
      </div>
    </div>
  );
};

export default connect(null, {
  login, changePage
})(LogIn);