const url = () => {
  if (process.env.NODE_ENV === 'development') {
    return "https://localhost:3000"
  } else {
    return "https://localhost:3031"
  };
};

const api = {
  url: url(),
  options: {
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  }
};

export default api;