import cookie from 'js-cookie';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://192.168.1.215:4000/api/v1'
    : 'http://192.168.1.215:4000/api/v1';

function headers() {
  const token = cookie.get('token');
  console.log("FORM API", token)
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token ? token : ""}`
  };
}

function parseResponse(response) {
  if (response.ok) {
    return response.json().then(json => json);
  }
  return response;
}

function queryString(params) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    return fetch(`${API_URL}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers()
    })
      .then(parseResponse)
      .catch(error => error);
  },

  post(url, data) {
    const body = JSON.stringify(data);
    return fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: headers(),
      body
    }).then(parseResponse);
  },

  patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API_URL}${url}`, {
      method: 'PATCH',
      headers: headers(),
      body
    }).then(parseResponse);
  },

  delete(url) {
    return fetch(`${API_URL}${url}`, {
      method: 'DELETE',
      headers: headers()
    }).then(parseResponse);
  }
};
