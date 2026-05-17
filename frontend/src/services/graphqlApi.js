import { requestJson } from './apiClient';
import { API_CONFIG } from './config';

export async function runGraphQLQuery(query, variables = {}) {
  const payload = await requestJson(API_CONFIG.gatewayGraphqlUrl, {
    method: 'POST',
    body: {
      query,
      variables
    }
  });

  if (payload?.errors?.length) {
    throw new Error(payload.errors[0].message || 'GraphQL request failed');
  }

  return payload?.data || {};
}
