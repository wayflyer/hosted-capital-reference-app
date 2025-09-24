import { POST_METHOD, GET_METHOD } from '../config';
import { apiClient } from './apiClient';

export const fetchWithAuth = async <REQ, RES>(
  endpoint: string,
  params: REQ | null,
  token: string,
  method: string,
): Promise<RES> => {
  let response = null;

  const authHeader = {
    Authorization: `Bearer ${token}`,
  };

  switch (method) {
    case POST_METHOD:
      response = await apiClient.post<RES>(endpoint, params, {
        headers: authHeader,
      });
      break;
    case GET_METHOD:
      response = await apiClient.get<RES>(endpoint, {
        headers: authHeader,
      });
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  return response.data;
};
