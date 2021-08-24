import api from '../apis';

const doIt = (type, payload, dispatch) => {
  switch (type) {
    case 'login':
      return dispatch({type: 'LOGIN', payload: true});
    case 'logout':
      return dispatch({type: 'LOGIN', payload: false});
    case 'changePage':
      return dispatch({type: 'CHANGE_PAGE', payload});
    case 'status':
      return dispatch({type: 'APPSTATUS', payload});
    case 'setSessions':
      return dispatch({type: 'SET_SESSIONS', payload});
    case 'fetchChange':
      return dispatch({type: 'FETCHCHANGE', payload});
    default: 
      return;
  };
};

const status401 = (dispatch) => {
  dispatch({type: 'APPSTATUS', payload: 401});
  dispatch({type: 'LOGIN', payload: false});
};

const catch500 = (dispatch) => {
  dispatch({type: 'APPSTATUS', payload: 500});
  dispatch({type: 'LOGIN', payload: false});
};



export const ping = () => async dispatch => {
  await fetch(api.url + '/ping',
    {...api.options, method: 'GET'}
  ).then(resp => resp.json())
  .then(res => {
    if (res.status === 200 && res.message === 'ok'){
      doIt('login', null, dispatch);
    } else {
      doIt('logout', null, dispatch);
    };
  })
  .catch(err => {
    catch500(dispatch);
  });
};

export const logout = () => async dispatch => {
  await fetch(api.url + '/logout', 
    {...api.options, method: 'POST'}
  ).then(resp => resp.json())
  .then(res => {
    if (res.status === 200) {
      doIt('logout', null, dispatch);
      doIt('changePage', 'login', dispatch);
    } else {
      doIt('status', res.status, dispatch);
      doIt('logout', null, dispatch);
    };
  })
  .catch(err => {
    catch500(dispatch);
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
      doIt('status', null, dispatch);
      doIt('login', null, dispatch);
    } else {
      doIt('status', res.status, dispatch);
      doIt('logout', null, dispatch);
    };
  })
  .catch(err => {
    catch500(dispatch);
  });

};

export const changePage = (page) => dispatch => {
  doIt('status', null, dispatch);
  doIt('changePage', page, dispatch);
};

export const signUp = (body) => async dispatch => {
  const newBody = {...body, tandc: '1.0'};
  doIt('status', 'loading', dispatch);
  await fetch(api.url + '/signup', 
    {...api.options, method: 'POST', body: JSON.stringify(newBody)}
  )
  .then(res => res.json())
  .then(res => {
    if (res.status === 201 && res.message === 'User Added') {
      doIt('status', null, dispatch);
      doIt('login', null, dispatch);
    } else {
      doIt('status', res.status, dispatch);
      doIt('logout', null, dispatch);
    };
    if (res.status === 409) {
      doIt('changePage', 'home', dispatch);
    };
  })
  .catch(err => {
    catch500(dispatch);
  });
};

export const createSession = (body) => async dispatch => {
  doIt('status', 'loading', dispatch);
  body.date = body.date.split('-').reverse().join('-');
  await fetch(api.url + '/createSession',
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  )
  .then(res => res.json())
  .then(res => {
    if (res.status === 201) {
      doIt('status', null, dispatch);
      doIt('changePage', 'home', dispatch);
    } else {
      doIt('status', res.status, dispatch);
      doIt('changePage', 'home', dispatch);
    };
    if (res.status === 401) {
      status401(dispatch);
    } else {
      doIt('status', res.status, dispatch);
      doIt('changePage', 'home', dispatch);
    };
  })
  .catch(err => {
    catch500(dispatch);
  });
};

export const getMonthSessions = () => async dispatch => {
  doIt('status', 'loading', dispatch);
  await fetch(api.url + '/getMonthSessions', 
    {...api.options, method: 'GET'}
  )
  .then(res => res.json())
  .then(res => {
    if (res.status === 200) {
      doIt('status', null, dispatch);
      doIt('setSessions', res.sessions, dispatch);
    } else if (res.status === 404) {
      doIt('status', res.status, dispatch);
      doIt('setSessions', null, dispatch);
    } else if (res.status === 401) {
      status401(dispatch);
    } else {
      doIt('status', res.status, dispatch);
      doIt('setSessions', null, dispatch);
    };
  })
  .catch(err => {
    catch500(dispatch);
  });
};

export const getAllSessions = () => async dispatch => {
  doIt('status', 'loading', dispatch);
  doIt('fetchChange', false, dispatch);
  await fetch(api.url + '/getAllSessions',
    {...api.options, method: 'GET'}
  )
  .then(res => res.json())
  .then(res => {
    if (res.status === 200) {
      doIt('status', null, dispatch);
      doIt('setSessions', res.sessions, dispatch);
    } else if (res.status === 401) {
      status401(dispatch);
    } else {
      doIt('status', res.status, dispatch);
      doIt('setSessions', null, dispatch);
    };
  })
  .catch(err => {
    catch500(dispatch);
  });
};

export const fetchChange = (bool) => dispatch => {
  doIt('fetchChange', bool, dispatch);
};

export const clearError = () => dispatch => {
  doIt('status', null, dispatch);
};


