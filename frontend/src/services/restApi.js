import { requestJson } from './apiClient';

export const getRest = async (url) => requestJson(url, { method: 'GET' });

export const postRest = async (url, payload) =>
  requestJson(url, { method: 'POST', body: payload });

export async function requestFirstAvailable(endpoints, callback) {
  let lastError;

  for (const endpoint of endpoints) {
    try {
      const result = await callback(endpoint);
      return result;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('No available endpoint');
}
