const host = window.location.host === "localhost:3001" ? 'http://localhost:3000' : '';

const api = {
  url: `${host}`,
  options: {
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  }
};

export default api;