import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {login, changePage} from '../actions';
import Logo from './Logo';

const LogIn = ({login, changePage}) => {

  const [email, setEmail] = useState('sam@sam.com');
  const [emailError, setEmailError] = useState('');
  const [pword, setPword] = useState('password');
  const [pwordError, setPwordError] = useState('');
  const [anyError, setAnyError] = useState(false);

  useEffect(() => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailOk = re.test(email.toLowerCase());
    
    if (emailOk && pword) {
      setEmailError('');
      setPwordError('');
    } else if (emailOk && !pword) {
      setEmailError('');
      setPwordError('error');
    } else if (!emailOk && pword) {
      setEmailError('error');
      setPwordError('');
    } else {
      setEmailError('error');
      setPwordError('error');
    };
  }, [email, pword]);

  useEffect(() => {
    if (emailError || pwordError) {
      setAnyError(true);
    } else {
      setAnyError(false);
    };
  }, [emailError, pwordError]);

  const onSubmit = e => {
    e.preventDefault();
    if (!anyError) {
      login({email, pword});
    } else {
      return;
    };
  };
  
  return (
    <div className='ui container'>
      <Logo />


      <form 
        className='ui form'
        onSubmit={onSubmit}
      >

        <div className={`field ${emailError}`}>
          <label>Email:</label>
          <input
            type='text'
            name='email'
            placeholder='Email...'
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>

        <div className={`field ${pwordError}`}>
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
          onClick={() => changePage('signup')}>
          Create an account
        </p>
      </div>
    </div>
  );
};

export default connect(null, {
  login, changePage
})(LogIn);