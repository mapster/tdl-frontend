import axios from 'axios';
import {Host} from '../appconfig';

const USERS_RESOURCE_URL = Host + '/users';
const USERS_AUTH_RESOURCE_URL = USERS_RESOURCE_URL + '/user_authorizations';

export const onlyModifiableProfileFields = ({email, name, password, password_confirmation}) => ({email, name, password, password_confirmation});

export const getUser = () => axios.get(USERS_RESOURCE_URL);
export const updateUser = (user) => axios.put(USERS_RESOURCE_URL, onlyModifiableProfileFields(user));
export const createUser = (user) => axios.post(USERS_RESOURCE_URL, onlyModifiableProfileFields(user));
export const getAuth = () => axios.get(USERS_AUTH_RESOURCE_URL);