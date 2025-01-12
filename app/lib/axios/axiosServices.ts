import instance from './instance';

const axiosServices = {
  login: (email: string, password: string) => instance.post('/login', { email, password }),
  register: (email: string, password: string) => instance.post('/register', { email, password })
};

export default axiosServices;