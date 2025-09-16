import axios from 'axios';

import { SANDBOX_BASE_URL } from '../config';

export const apiClient = axios.create({
  baseURL: SANDBOX_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
