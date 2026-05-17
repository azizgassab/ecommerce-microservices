import { API_CONFIG } from './config';

export class ApiError extends Error {
  constructor(message, { status, data, cause } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status || 0;
    this.data = data;
    this.cause = cause;
  }
}

const parseResponseBody = (rawBodyText) => {
  if (!rawBodyText) {
    return null;
  }

  try {
    return JSON.parse(rawBodyText);
  } catch {
    return rawBodyText;
  }
};

export async function requestJson(
  url,
  { method = 'GET', body, headers = {}, timeoutMs = API_CONFIG.requestTimeoutMs } = {}
) {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

  const resolvedHeaders = { ...headers };
  const resolvedOptions = {
    method,
    headers: resolvedHeaders,
    signal: abortController.signal
  };

  if (body !== undefined) {
    const isStringBody = typeof body === 'string';
    if (!isStringBody && !resolvedHeaders['Content-Type']) {
      resolvedHeaders['Content-Type'] = 'application/json';
    }

    resolvedOptions.body = isStringBody ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, resolvedOptions);
    const rawBodyText = await response.text();
    const payload = parseResponseBody(rawBodyText);

    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}`, {
        status: response.status,
        data: payload
      });
    }

    return payload;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out', { cause: error });
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError('Network request failed', { cause: error });
  } finally {
    clearTimeout(timeoutId);
  }
}
