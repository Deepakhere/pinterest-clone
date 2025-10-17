export const API_ENDPOINTS = {
  PHOTOS: "/photos",
  SEARCH_PHOTOS: "/search/photos",
};

export const API_QUERY_KEY = {
  GET_PHOTOS: "get-photos",
  GET_PHOTO_BY_ID: "get-photo-by-id",
  SEARCH_PHOTOS: "search-photos",
};

// Responsive Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Gallery Configuration
export const GALLERY_CONFIG = {
  columns: {
    mobile: 1, // Mobile: 1 column
    smallTablet: 2, // Small tablet: 2 columns
    tablet: 3, // Tablet: 3 columns
    desktop: 4, // Desktop: 4 columns
    largeDesktop: 5, // Large desktop: 5 columns
  },
  breakpoints: {
    mobile: 640, // sm
    smallTablet: 768, // md
    tablet: 1024, // lg
    desktop: 1280, // xl
    largeDesktop: 1536, // 2xl
  },
  gap: 16, // in pixels
  imageQuality: "regular" as const,
  masonry: {
    itemMinHeight: 200,
    itemMaxHeight: 600,
    loadingPlaceholderHeight: 250,
  },
} as const;

// Modal Configuration
export const MODAL_CONFIG = {
  backdropBlur: "backdrop-blur-sm",
  animationDuration: 200,
  closeOnEscape: true,
  closeOnBackdrop: true,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  network: "Network error. Please check your internet connection.",
  apiLimit: "API rate limit exceeded. Please try again later.",
  notFound: "No images found.",
  generic: "Something went wrong. Please try again.",
  invalidApiKey: "Invalid API key. Please check your configuration.",
};
