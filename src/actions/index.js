import api from '../apis';

export const ping = () => async dispatch => {
  await fetch(api.url + '/ping',
    {...api.options, method: 'GET'}
  ).then(resp => resp.json())
  .then(res => {
    if (res.status === 200 && res.message === 'ok'){
      dispatch({type: 'LOGIN', payload: true});
    } else {
      dispatch({type: 'LOGIN', payload: false});
    };
  })
  .catch(err => {
    dispatch({type: 'APPSTATUS', payload: 500});
    dispatch({type: 'LOGIN', payload: false});
  });
};

export const logout = () => async dispatch => {
  await fetch(api.url + '/logout', 
    {...api.options, method: 'POST'}
  ).then(resp => resp.json())
  .then(res => {
      dispatch({type: 'LOGIN', payload: false});
      dispatch({type: 'CHANGE_PAGE', payload: 'login'});
  })
  .catch(err => {
    dispatch({type: 'APPSTATUS', payload: 500});
    dispatch({type: 'LOGIN', payload: false});
  });
};

export const login = (body) => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'})
  await fetch(api.url + '/login',
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  )
  .then(res => res.json())
  .then(res => {
    if (res.status === 202 && res.message === 'Logged In') {
      dispatch({type: 'APPSTATUS', payload: null});
      dispatch({type: 'LOGIN', payload: true});
    } else {
      dispatch({type: 'APPSTATUS', payload: res.status});
      dispatch ({type: 'LOGIN', payload: false});
    };
  })
  .catch(err => {
    dispatch({type: 'APPSTATUS', payload: 500});
    dispatch({type: 'LOGIN', payload: false});
  });

};

export const changePage = (page) => dispatch => {
  dispatch({type: 'APPSTATUS', payload: null});
  dispatch({type: 'CHANGE_PAGE', payload: page});
};

export const signUp = (body) => async dispatch => {
  const newBody = {...body, tandc: '1.0'};
  dispatch({type: 'APPSTATUS', payload: 'loading'})
  await fetch(api.url + '/signup', 
    {...api.options, method: 'POST', body: JSON.stringify(newBody)}
  )
  .then(res => res.json())
  .then(res => {
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
    };
  })
  .catch(err => {
    dispatch({type: 'APPSTATUS', payload: 500})
    dispatch({type: 'LOGIN', payload: false});
  });
};

export const createSession = (body) => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'});  
  body.date = body.date.split('-').reverse().join('-');
  await fetch(api.url + '/createSession',
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  )
  .then(res => res.json())
  .then(res => {
    if (res.status === 201) {
      dispatch({type: 'APPSTATUS', payload: null});
      dispatch({type: 'CHANGE_PAGE', payload: 'home'});
    } else if (res.status === 401) {
      dispatch({type: 'APPSTATUS', payload: res.status});
      dispatch({type: 'LOGIN', payload: false});
    } else {
      dispatch({type: 'APPSTATUS', payload: res.status});
      dispatch({type: 'CHANGE_PAGE', payload: 'home'});
    };
  })
  .catch(err => {
    dispatch({type: 'APPSTATUS', payload: 500});
    dispatch({type: 'LOGIN', payload: false});
  });
};

export const getMonthSessions = () => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'});  

  await fetch(api.url + '/getMonthSessions', 
    {...api.options, method: 'GET'}
  )
  .then(res => res.json())
  .then(res => {
    if (res.status === 200) {
      dispatch({type: 'APPSTATUS', payload: null});
      dispatch({type: 'SET_SESSIONS', payload: res.sessions});
    } else if (res.status === 404) {
      dispatch({type: 'APPSTATUS', payload: res.status});
      dispatch({type: 'SET_SESSIONS', payload: null});
    } else if (res.status === 401) {
      dispatch({type: 'APPSTATUS', payload: res.status});
      dispatch({type: 'LOGIN', payload: false});
    } else {
      dispatch({type: 'APPSTATUS', payload: res.status});
      dispatch({type: 'SET_SESSIONS', payload: null});
    };
  })
  .catch(err => {
    dispatch({type: 'APPSTATUS', payload: 500});
    dispatch({type: 'LOGIN', payload: false});
  });
};

export const getAllSessions = () => async dispatch => {
  dispatch({type: 'APPSTATUS', payload: 'loading'});  
  dispatch({type: 'FETCHCHANGE', payload: false});

  await fetch(api.url + '/getAllSessions',
    {...api.options, method: 'GET'}
  )
  .then(res => res.json())
  .then(res => {
    if (res.status === 200) {
      dispatch({type: 'APPSTATUS', payload: null});
      dispatch({type: 'SET_SESSIONS', payload: res.sessions});
    } else if (res.status === 401) {
      dispatch({type: 'APPSTATUS', payload: res.status});
      dispatch({type: 'LOGIN', payload: false});
    } else {
      dispatch({type: 'APPSTATUS', payload: res.status});
      dispatch({type: 'SET_SESSIONS', payload: null});
    };
  })
  .catch(err => {
    dispatch({type: 'APPSTATUS', payload: 500});
    dispatch({type: 'LOGIN', payload: false});
  });
};

export const fetchChange = (bool) => dispatch => {
  dispatch({type: 'FETCHCHANGE', payload: bool});
};

export const clearError = () => dispatch => {
  dispatch({type: 'APPSTATUS', payload: null});
};


