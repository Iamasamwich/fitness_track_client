const url = () => {
  if (process.env.NODE_ENV === 'development') {
    return "https://localhost:3000"
  } else {
    return process.env.HOST + ':' + process.env.PORT
  };
}

const api = {
  url: url(),
  options: {
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  }
};

export default api;