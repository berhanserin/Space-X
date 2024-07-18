import axios from 'axios';

axios.defaults.baseURL = 'https://case.posteffect.io/';

const api = {
  auth: {
    register: async (values: { email: string; password: string }) =>
      await axios
        .post('auth/register', values)
        .then(res => res.data)
        .catch(e => e),
    login: async (values: { email: string; password: string }) =>
      await axios
        .post('auth/login', values)
        .then(res => res.data)
        .catch(e => e),
  },
  feed: {
    feed: async () =>
      axios
        .get('feed')
        .then(res => res.data)
        .catch(e => e),
    events: async () =>
      axios
        .get('feed/events')
        .then(res => res.data)
        .catch(e => e),
  },
};

export default api;
