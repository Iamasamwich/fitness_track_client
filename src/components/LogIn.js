import React, {useState} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';

const LogIn = ({login}) => {

  const [email, setEmail] = useState('testAddUser@test.com');
  const [pword, setPword] = useState('newPassword');

  const onSubmit = e => {
    e.preventDefault();
    login({email, pword});
  };

  return (
    <div className='ui container'>
      <form 
        className='ui form'
        onSubmit={onSubmit}
      >
        <div className="field">
          <label>Email:</label>
          <input
            type='text'
            name='email'
            placeholder='Email...'
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Password:</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={pword}
            onChange={e => setPword(e.target.value)} />
        </div>
        <button className="ui button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default connect(null, {
  login
})(LogIn);