import { apiClient } from '../../../configs/axios';
import useAuth from './useAuth';
import { useCallback } from 'react';

export default function useApi() {
  const { accessToken, refreshToken, refresh } = useAuth();

  console.log("use api work now");

  const callApi = useCallback(async (url, method = "get", data = {}) => {
    let token;
    if (accessToken) {
      const now = new Date();
      const expires = new Date(accessToken.expires);
      now.setMinutes(now.getMinutes() + 1);
      if (now.getTime() < expires.getTime()) {
        token = accessToken.token;
      }
    }

    if (!token && refreshToken) {
      token = await refresh();
    }

    if (token) {
      const response = await apiClient({
        method,
        url,
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }

    return false;
  }, []);

  return {
    callApi,
  };
}