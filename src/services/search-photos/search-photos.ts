import { useQuery } from "react-query";

import { apiClient } from "../../apis/api-client";
import { API_ENDPOINTS, API_QUERY_KEY } from "../../utils/enums";
import type { UnsplashSearchResponse } from "../../types";

const searchUnsplashPhotos = async (
  query: string,
  page: number,
  perPage: number
): Promise<UnsplashSearchResponse> => {
  const response = await apiClient.get(API_ENDPOINTS.SEARCH_PHOTOS, {
    params: {
      query: query.trim(),
      page,
      per_page: perPage,
    },
  });

  // Unsplash search API returns an object with results array
  return {
    total: response.data.total || 0,
    total_pages: response.data.total_pages || 0,
    results: response.data.results || [],
  };
};

const useSearchUnsplashPhotos = ({
  query,
  page,
  perPage,
  enabled = true,
}: {
  query: string;
  page: number;
  perPage: number;
  enabled?: boolean;
}) =>
  useQuery(
    [API_QUERY_KEY.SEARCH_PHOTOS, query, page, perPage],
    () => searchUnsplashPhotos(query, page, perPage),
    {
      enabled: enabled && !!query.trim(),
    }
  );

export default useSearchUnsplashPhotos;
