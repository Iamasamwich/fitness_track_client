import api from '../apis';

export const ping = () => async dispatch => {
  const res = await fetch(api.url + '/ping',
    {...api.options, method: 'GET'}
  ).then(resp => resp.json());
  if (res.status === 200 && res.message === 'ok'){
    dispatch({type: 'LOGIN', payload: true});
  } else {
    dispatch({type: 'LOGIN', payload: false});
  };
};

export const logout = () => async dispatch => {
  const res = await fetch(api.url + '/logout', 
  {...api.options, method: 'POST'}
  ).then(resp => resp.json());
  if (res.status === 200 && res.message === 'Logged Out') {
    dispatch({type: 'LOGIN', payload: false});
    dispatch({type: 'CHANGE_PAGE', payload: 'login'});
  };
};

export const login = (body) => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'})
  const res = await fetch(api.url + '/login',
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  )
  .then(res => res.json());
  if (res.status === 202 && res.message === 'Logged In') {
    dispatch({type: 'APPSTATUS', payload: null})
    dispatch({type: 'LOGIN', payload: true});
  } else {
    dispatch ({type: 'LOGIN', payload: false});
  };
};

export const changePage = (page) => dispatch => {
  dispatch({type: 'CHANGE_PAGE', payload: page});
};

export const signUp = (body) => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'})
  const res = await fetch(api.url + '/signup', 
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  )
  .then(res => res.json());

  if (res.status === 201 && res.message === 'User Added') {
    dispatch({type: 'APPSTATUS', payload: null})
    dispatch({type: 'LOGIN', payload: true});
  } else {
    dispatch({type: 'APPSTATUS', payload: null})
    dispatch({type: 'LOGIN', payload: false});
    dispatch({type: 'CHANGE_PAGE', payload: 'signup'});
  };
};

export const createSession = (body) => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'});  
  body.date = body.date.split('-').reverse().join('-');
  const res = await fetch(api.url + '/createSession',
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  )
  .then(res => res.json());
  if (res.status === 201) {
    dispatch({type: 'APPSTATUS', payload: null});
    dispatch({type: 'CHANGE_PAGE', payload: login});
  } else {
    dispatch({type: 'APPSTATUS', payload: res.status});
  };
};

export const getMonthSessions = () => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'});  

  const res = await fetch(api.url + '/getMonthSessions', 
    {...api.options, method: 'GET'}
  )
  .then(res => res.json());
  if (res.status === 200) {
    dispatch({type: 'APPSTATUS', payload: null});
    dispatch({type: 'SET_SESSIONS', payload: res.sessions});
  };
  if (res.status === 404) {
    dispatch({type: 'SET_SESSIONS', payload: []});
  }
};

export const getAllSessions = () => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'});  

  console.log('actions/getAllSessions running');
  const res = await fetch(api.url + '/getAllSessions',
    {...api.options, method: 'GET'}
  )
  .then(res => res.json());
  if (res.status === 200) {
    dispatch({type: 'APPSTATUS', payload: null});
    dispatch({type: 'SET_SESSIONS', payload: res.sessions});
  };
  if (res.status === 404) {
    dispatch({type: 'SET_SESSIONS', payload: []});
  };
};


