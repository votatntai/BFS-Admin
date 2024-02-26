import axios from "./customAxios";
/**
 * Account
 */
export const getUsers = (object: Object) => axios.get(`/users`,{params: object});
export const getPosts = (object: Object) => axios.get(`/posts`,{params: object});


/**
 * Farm
 */
export const getFarms = (object: Object) => axios.get(`/farms`,{params: object});
export const createFarm = (formData: FormData) => axios.post('/farms',formData);
export const updateFarm = (id: string, formData: FormData) => axios.put(`/farms/${id}`,formData);

/**
 * Area
 */
 export const getAreas = (object: Object) => axios.get(`/areas`,{params: object});
 export const createArea = (formData: FormData) => axios.post('/areas',formData);
 export const updateArea= (id: string, formData: FormData) => axios.put(`/areas/${id}`,formData);

/**
 * Care mode
 */
 export const getCaremodes = (object: Object) => axios.get(`/care-modes`,{params: object});
 export const createCaremode = (formData: FormData) => axios.post('/care-modes',formData);
 export const updateCaremode = (id: string, formData: FormData) => axios.put(`/care-modes/${id}`,formData);

/**
 * Account
 */

/**
 * Account
 */