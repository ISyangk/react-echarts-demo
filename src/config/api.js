const api = {
    dev: 'http://localhost:8080',
    prod: '',
    rd: '',
    test: '',
};

export default api[process.env.REACT_APP_SECRET_BUILD_TYPE];
