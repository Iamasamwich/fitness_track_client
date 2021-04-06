import api from '../apis';

export const ping = () => async dispatch => {
  const res = await fetch(api.url + '/',
    {...api.options, method: 'GET'}
  ).then(res => res.json());
  if (res.status === '200' && res.message === 'ok'){
    return dispatch({type: 'LOGIN', payload: true});
  } 
  return dispatch({type: 'LOGIN', payload: false});
};

export const login = (body) => async dispatch => {
  const res = await fetch(api.url + '/login',
    {...api.options, method: 'POST', body: JSON.stringify(body)}
  ).then(res => res.json());
  console.log('res', res);
  if (res.status === 202 && res.message === 'Logged In') {
    return dispatch({type: 'LOGIN', payload: true});
  }
  return dispatch ({type: 'LOGIN', payload: false});
};
