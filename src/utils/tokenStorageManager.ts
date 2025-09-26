import type { AuthToken } from '../types';
import {
  PARTNER_TOKEN_KEY,
  PARTNER_EXPIRES_KEY,
  COMPANY_TOKEN_KEY,
  COMPANY_EXPIRES_KEY,
} from '../config';

export const getToken = (storageKey: string) => {
  return localStorage.getItem(storageKey);
};

export const setToken = (authToken: AuthToken, storageKey: string) => {
  const { token, expires_in } = authToken;

  const expiresAt = new Date(Date.now() + expires_in * 1000);
  const tokenToStore: AuthToken = {
    token,
    expires_in: expiresAt,
  };
};
