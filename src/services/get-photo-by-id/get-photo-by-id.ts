import { useQuery } from "react-query";
import { AxiosError } from "axios";

import { apiClient } from "../../apis/api-client";
import { API_ENDPOINTS, API_QUERY_KEY } from "../../utils/enums";
import type { UnsplashImage } from "../../types";

const getUnsplashPhotoById = async (id: string): Promise<UnsplashImage> => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.PHOTOS}/${id}`);

    // Unsplash API returns the image object directly
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{
      errors?: string[];
      error_code?: string;
    }>;
    throw {
      message:
        axiosError.response?.data?.errors?.[0] ||
        axiosError.message ||
        "Failed to fetch photo details",
      status: axiosError.response?.status,
      code: axiosError.response?.data?.error_code,
    };
  }
};

const useGetUnsplashPhotosById = ({
  id,
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) =>
  useQuery(
    [API_QUERY_KEY.GET_PHOTO_BY_ID, id],
    () => getUnsplashPhotoById(id),
    {
      enabled: enabled && !!id,
    }
  );

export default useGetUnsplashPhotosById;
