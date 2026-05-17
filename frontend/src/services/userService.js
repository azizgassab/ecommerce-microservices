import { runGraphQLQuery } from './graphqlApi';
import { getRest } from './restApi';
import { API_CONFIG } from './config';

const USERS_QUERY = `
  query Users {
    users {
      id
      name
      email
    }
  }
`;

export async function fetchUsersFromGraphql() {
  const data = await runGraphQLQuery(USERS_QUERY);
  return Array.isArray(data?.users) ? data.users : [];
}

export async function fetchUsersFromRest() {
  const payload = await getRest(`${API_CONFIG.gatewayRestUrl}/users`);
  return Array.isArray(payload) ? payload : [];
}
