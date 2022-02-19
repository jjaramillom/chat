import axiosLibrary from 'axios';

const axios = axiosLibrary.create({
	baseURL: '/api'
});

export default axios;
