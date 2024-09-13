import axios from 'axios';

const apiInstance = axios.create();
apiInstance.defaults.withCredentials = true;

export default apiInstance;
