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
    dispatch({type: 'APPSTATUS', payload: res.status});
    dispatch ({type: 'LOGIN', payload: false});
  };
};

export const changePage = (page) => dispatch => {
  dispatch({type: 'APPSTATUS', payload: null});
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
  } else if (res.status === 409) {
    dispatch({type: 'APPSTATUS', payload: res.status});
    dispatch({type: 'CHANGE_PAGE', payload: 'home'});
    dispatch({type: 'LOGIN', payload: false});
  } else {
    dispatch({type: 'APPSTATUS', payload: res.status})
    dispatch({type: 'LOGIN', payload: false});
    // dispatch({type: 'CHANGE_PAGE', payload: 'home'});
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
    dispatch({type: 'CHANGE_PAGE', payload: 'home'});
  } else {
    dispatch({type: 'APPSTATUS', payload: res.status});
    dispatch({type: 'CHANGE_PAGE', payload: 'home'});
  };
};

export const getMonthSessions = () => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'});  

  const res = await fetch(api.url + '/getMonthSessions', 
    {...api.options, method: 'GET'}
  )
  .then(res => res.json());

  console.log(res);
  if (res.status === 200) {
    dispatch({type: 'APPSTATUS', payload: null});
    dispatch({type: 'SET_SESSIONS', payload: res.sessions});
  } else if (res.status === 404) {
    console.log('got a 404 back...');
    dispatch({type: 'APPSTATUS', payload: res.status});
    dispatch({type: 'SET_SESSIONS', payload: null});
  } else {
    dispatch({type: 'APPSTATUS', payload: res.status});
    dispatch({type: 'SET_SESSIONS', payload: null});
  };
  

};

export const getAllSessions = () => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'});  
  dispatch({type: 'FETCHCHANGE', payload: false});

  const res = await fetch(api.url + '/getAllSessions',
    {...api.options, method: 'GET'}
  )
  .then(res => res.json());
  if (res.status === 200) {
    dispatch({type: 'APPSTATUS', payload: null});
    dispatch({type: 'SET_SESSIONS', payload: res.sessions});
  } else {
    dispatch({type: 'APPSTATUS', payload: res.status});
    dispatch({type: 'SET_SESSIONS', payload: null});
  };
};

export const fetchChange = (bool) => dispatch => {
  dispatch({type: 'FETCHCHANGE', payload: bool});
};

export const clearError = () => dispatch => {
  dispatch({type: 'APPSTATUS', payload: null});
}


