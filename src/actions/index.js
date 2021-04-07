import api from '../apis';

export const ping = () => async dispatch => {
  const res = await fetch(api.url + '/',
    {...api.options, method: 'GET'}
  ).then(resp => resp.json());
  if (res.status === 200 && res.message === 'ok'){
    dispatch({type: 'LOGIN', payload: true});
  } else {
    dispatch({type: 'LOGIN', payload: false});
  };
};

export const login = (body) => async dispatch => {
  const res = await fetch(api.url + '/login',
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  )
  .then(res => res.json());
  console.log(res);
  if (res.status === 202 && res.message === 'Logged In') {
    dispatch({type: 'LOGIN', payload: true});
  } else {
    dispatch ({type: 'LOGIN', payload: false});
  };
};

export const changePage = (page) => dispatch => {
  dispatch({type: 'CHANGE_PAGE', payload: page});
};

export const signUp = (body) => async dispatch => {
  const res = await fetch(api.url + '/signup', 
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  )
  .then(res => res.json())
  console.log(res);
  if (res.status === 201 && res.message === 'User Added') {
    dispatch({type: 'LOGIN', payload: true});
  } else {
    dispatch({type: 'LOGIN', payload: false});
    dispatch({type: 'CHANGE_PAGE', payload: 'signup'});
  };
};
