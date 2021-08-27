const host = () => {
  const loc = window.location.host;
  if (loc === "localhost:3001") {
    return 'http://localhost:3000';
  } else if (loc === '192.168.43.5:3001') {
    return 'http://192.168.43.5:3000';
  } else {
    return '';
  };
};
  
const api = {
  url: `${host()}`,
  options: {
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  }
};

export default api;