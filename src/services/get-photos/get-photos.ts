import { useQuery } from "react-query";

import { apiClient } from "../../apis/api-client";
import { API_ENDPOINTS, API_QUERY_KEY } from "../../utils/enums";
import type { UnsplashImage } from "../../types";
import type { AxiosError } from "axios";

const getUnsplashPhotos = async (
  page: number,
  perPage: number
): Promise<UnsplashImage[]> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.PHOTOS, {
      params: {
        page,
        per_page: perPage,
      },
    });

    // Unsplash API returns array directly for photos endpoint
    return response.data || [];
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{
      errors?: string[];
      error_code?: string;
    }>;
    throw {
      message:
        axiosError.response?.data?.errors?.[0] ||
        axiosError.message ||
        "Failed to fetch photos",
      status: axiosError.response?.status,
      code: axiosError.response?.data?.error_code,
    };
  }
};

const useGetUnsplashPhotos = ({
  page,
  perPage,
  enabled = true,
}: {
  page: number;
  perPage: number;
  enabled?: boolean;
}) =>
  useQuery(
    [API_QUERY_KEY.GET_PHOTOS, page, perPage],
    () => getUnsplashPhotos(page, perPage),
    {
      enabled,
      cacheTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 2 * 60 * 1000, // 2 minutes
      retry: 2,
    }
  );

export default useGetUnsplashPhotos;
