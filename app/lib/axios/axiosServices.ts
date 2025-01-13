import instance from './instance';

const axiosServices = {
  login: (email: string, password: string) => instance.post('/login', { email, password }),
  register: (name: string, role: string, email: string, password: string) => instance.post('/register', { name, role, email, password })
};

export default axiosServices;