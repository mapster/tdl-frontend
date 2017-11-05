import axios from 'axios';
import {Host} from '../../appconfig';
import Authorizations from '../../constants/authorizations';
import {resolveParams} from '../../routes';

const USERS_RESOURCE_URL = Host + '/admin/users';
const USER_RESOURCE_URL = USERS_RESOURCE_URL + '/:userId';
const USER_AUTHORIZATIONS_RESOURCE_URL = USER_RESOURCE_URL + '/user_authorizations';

const onlyModifiableUserAuthorizationFields = (user_authorizations) => {
  const modifiable = {};
  Object.keys(Authorizations).forEach(auth => modifiable[auth] = user_authorizations[auth]);
  return modifiable;
};

export const getUsers = () => axios.get(USERS_RESOURCE_URL);

export const putUserAuthorizations = (authorizations) => axios.put(
  resolveParams(USER_AUTHORIZATIONS_RESOURCE_URL, {userId: authorizations.user_id}),
  onlyModifiableUserAuthorizationFields(authorizations),
);