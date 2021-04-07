import React, {useState} from 'react';
import {connect} from 'react-redux';
import {login, changePage} from '../actions';

const LogIn = ({login, changePage}) => {

  const [email, setEmail] = useState('testAddUser@test.com');
  const [pword, setPword] = useState('newPassword');

  const onSubmit = e => {
    e.preventDefault();
    login({email, pword});
  };
  
  const clickCreate = e => {
    e.preventDefault();
    changePage('signup');
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
      <div className="content">
        <p><a onClick={clickCreate}>Create an account</a></p>
      </div>
    </div>
  );
};

export default connect(null, {
  login, changePage
})(LogIn);