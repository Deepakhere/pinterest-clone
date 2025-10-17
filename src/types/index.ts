export interface UnsplashImage {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
  };
  likes: number;
  liked_by_user: boolean;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

// Gallery State Types
export interface GalleryState {
  images: UnsplashImage[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  hasNextPage: boolean;
}

// Modal State Types
export interface ModalState {
  isOpen: boolean;
  selectedImage: UnsplashImage | null;
}

// Error Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  perPage: number;
  query?: string;
}

// Hook Return Types
export interface UseInfiniteScrollReturn {
  data: UnsplashImage[];
  isLoading: boolean;
  error: ApiError | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export interface UseModalReturn {
  isOpen: boolean;
  selectedImage: UnsplashImage | null;
  openModal: (image: UnsplashImage) => void;
  closeModal: () => void;
}
