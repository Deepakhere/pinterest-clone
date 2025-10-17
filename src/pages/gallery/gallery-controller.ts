import { useCallback, useState, useEffect } from "react";
import toast from "react-hot-toast";

import type { UnsplashImage } from "../../types";
import { useGetUnsplashPhotos, useGetUnsplashPhotosById } from "../../services";
import useError from "../../hooks/error";

const PAGE_SIZE = 20;

export const useGalleryController = () => {
  const [selectedImageDetails, setSelectedImageDetails] =
    useState<UnsplashImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string>("");

  // Pagination and data state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allImages, setAllImages] = useState<UnsplashImage[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isInfiniteScrollMode, setIsInfiniteScrollMode] =
    useState<boolean>(true);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState<boolean>(false);

  // Use existing hooks
  const photosQuery = useGetUnsplashPhotos({
    page: currentPage,
    perPage: PAGE_SIZE,
  });

  // Photo by ID query for modal
  const photoByIdQuery = useGetUnsplashPhotosById({
    id: selectedImageId,
    enabled: isModalOpen && !!selectedImageId,
  });

  // Error handling using custom hook
  useError({
    error: photoByIdQuery.error,
    isError: photoByIdQuery.isError,
    entity: "image details",
    operation: "load",
  });

  useError({
    error: photosQuery.error,
    isError: photosQuery.isError,
    entity: "photos",
    operation: "fetch",
  });

  // Handle successful data fetch
  useEffect(() => {
    if (photosQuery.isSuccess && photosQuery.data) {
      let newImages: UnsplashImage[] = [];
      let apiTotalPages = 1;
      let apiTotalCount = 0;

      newImages = photosQuery.data as UnsplashImage[];
      // For regular photos, use default total count of 200 and calculate pages
      // because we can't get total count so pagination is not possible
      const defaultTotalCount = 200;
      apiTotalCount = defaultTotalCount;
      apiTotalPages = Math.ceil(defaultTotalCount / PAGE_SIZE); // 10 pages for 200 images

      // If we get less than PAGE_SIZE, we might be at the end
      if (newImages.length < PAGE_SIZE) {
        apiTotalPages = currentPage;
        apiTotalCount = (currentPage - 1) * PAGE_SIZE + newImages.length;
      }

      // Handle different modes: infinite scroll vs pagination
      if (isInfiniteScrollMode) {
        // Infinite scroll mode: append new images with deduplication
        if (allImages.length === 0 && currentPage === 1) {
          // Very first load - set initial images
          setAllImages(newImages);
        } else {
          // Append to existing images with deduplication
          setAllImages((prev) => {
            const existingIds = new Set(prev.map((img) => img.id));
            const uniqueNewImages = newImages.filter(
              (img) => !existingIds.has(img.id)
            );
            return [...prev, ...uniqueNewImages];
          });
        }
      } else {
        // Pagination mode: replace images with current page data
        setAllImages(newImages);
      }

      // Update total pages, total count and check if there are more pages
      setTotalPages(apiTotalPages);
      setTotalCount(apiTotalCount);
      const hasMore = currentPage < apiTotalPages;
      setHasMoreData(hasMore);

      // Mark as initially loaded (even if no images returned)
      if (!hasInitiallyLoaded) {
        setHasInitiallyLoaded(true);
      }
    }
  }, [
    photosQuery.isSuccess,
    photosQuery.data,
    currentPage,
    allImages.length,
    isInfiniteScrollMode,
    hasInitiallyLoaded,
  ]);

  // Handle API errors - also mark as initially loaded to stop skeleton
  useEffect(() => {
    if (photosQuery.isError && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true);
    }
  }, [photosQuery.isError, hasInitiallyLoaded]);

  // Load more data function - fetch next page (for infinite scroll)
  const onFetchNextData = useCallback(() => {
    if (!photosQuery.isLoading && !photosQuery.isFetching && hasMoreData) {
      // Enable infinite scroll mode when scrolling
      setIsInfiniteScrollMode(true);
      setCurrentPage((prev) => prev + 1);
    }
  }, [photosQuery.isLoading, photosQuery.isFetching, hasMoreData]);

  // Pagination navigation - go to specific page
  const goToPage = useCallback(
    (page: number) => {
      if (
        page >= 1 &&
        page <= totalPages &&
        page !== currentPage &&
        !photosQuery.isLoading &&
        !photosQuery.isFetching
      ) {
        // Enable pagination mode when clicking page numbers
        setIsInfiniteScrollMode(false);

        // Set the current page - this will trigger data loading
        setCurrentPage(page);

        // Show loading feedback for page navigation
        toast.loading(`Loading page ${page}...`, {
          id: "page-loading",
          duration: 2000,
        });

        // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [currentPage, totalPages, photosQuery.isLoading, photosQuery.isFetching]
  );

  // Image count helper function
  const getImageCountInfo = useCallback(() => {
    if (isInfiniteScrollMode) {
      // Infinite scroll mode: show total loaded images
      return {
        loadedImages: allImages.length,
        totalImages: totalCount > 0 ? totalCount : undefined,
        startIndex: 1,
        endIndex: allImages.length,
        currentPageImages: allImages.length,
      };
    } else {
      // Pagination mode: show current page range
      const startIndex = (currentPage - 1) * PAGE_SIZE + 1;
      const endIndex = Math.min(currentPage * PAGE_SIZE, totalCount);

      return {
        loadedImages: allImages.length,
        totalImages: totalCount > 0 ? totalCount : undefined,
        startIndex,
        endIndex,
        currentPageImages: allImages.length,
      };
    }
  }, [allImages.length, totalCount, currentPage, isInfiniteScrollMode]);

  // Pagination page numbers logic
  const getPageNumbers = useCallback(() => {
    const delta = 1; // Show 1 page on each side for compact header

    // For small number of pages, show all
    if (totalPages <= 7) {
      const range = [];
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    const rangeWithDots = [];

    // Always show first page
    rangeWithDots.push(1);

    // Calculate start and end of middle range
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // Add dots if there's a gap after first page
    if (start > 2) {
      rangeWithDots.push("...");
    }

    // Add middle range
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    // Add dots if there's a gap before last page
    if (end < totalPages - 1) {
      rangeWithDots.push("...");
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    // Remove duplicates and return unique pages
    return [...new Set(rangeWithDots)];
  }, [currentPage, totalPages]);

  // Modal functionality
  const handleImageClick = useCallback((image: UnsplashImage) => {
    // Set the image details immediately for better UX
    setSelectedImageDetails(image);
    setSelectedImageId(image.id); // Set ID for detailed fetch
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImageId("");
  }, []);

  // ESC key handler for modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };

    // Add event listener when modal is open
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen, handleCloseModal]);

  useEffect(() => {
    if (photoByIdQuery.isSuccess && photoByIdQuery.data) {
      setSelectedImageDetails(photoByIdQuery.data);
    }
  }, [photoByIdQuery.isSuccess, photoByIdQuery.data]);

  // Error handling for photo by ID query
  useEffect(() => {
    if (photoByIdQuery.error) {
      toast.error("Failed to load image details. Please try again.");
    }
  }, [photoByIdQuery.error]);

  return {
    images: allImages,
    isLoading:
      photosQuery.isLoading ||
      photosQuery.isFetching ||
      (!hasInitiallyLoaded && allImages.length === 0),
    error: photosQuery.error,
    hasNextPage: hasMoreData,
    isFetchingNextPage:
      (photosQuery.isLoading || photosQuery.isFetching) && currentPage > 1,
    currentPage,
    totalPages,
    totalCount,
    hasMoreData,
    isModalOpen,
    selectedImageDetails,
    isLoadingImageDetails:
      photoByIdQuery.isLoading || photoByIdQuery.isFetching,
    goToPage,
    getPageNumbers,
    onFetchNextData,
    getImageCountInfo,
    handleImageClick,
    handleCloseModal,
  };
};
