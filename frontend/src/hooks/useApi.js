// src/hooks/useApi.js

import { useState, useCallback } from "react";
import axios from "../axiosConfig"; // Import the configured Axios instance

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { callApi, loading, error };
};

export default useApi;
