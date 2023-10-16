export const BASE_URL = 'https://api.movies-explorer-hope.nomoredomainsicu.ru';

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`код ошибки: ${res.status}`);
}

export const register = (name, password, email) => {
  console.log({ name, password, email });
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ name, password, email }),
  }).then((res) => checkResponse(res));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },

    body: JSON.stringify({ password, email }),
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      return data;
    });
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};
