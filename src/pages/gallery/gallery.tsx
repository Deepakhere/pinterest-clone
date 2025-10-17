import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { SkeletonGrid, ImageModal } from "../../components";
import { useGalleryController } from "./gallery-controller";
import MasonryGrid from "./masonry-grid";

const Gallery: React.FC = () => {
  const {
    images,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    hasMoreData,
    isModalOpen,
    selectedImageDetails,
    isLoadingImageDetails,
    handleImageClick,
    handleCloseModal,
    getImageCountInfo,
    onFetchNextData,
    goToPage,
    getPageNumbers,
  } = useGalleryController();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-white shadow-lg backdrop-blur-md w-full"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          padding: "12px 10px",
          boxSizing: "border-box",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto flex-wrap gap-4 min-h-[40px]">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-black">Masonry Gallery</h1>
            </div>

            {/* Pagination Controls in Header */}
            <div
              className="flex items-center flex-wrap"
              style={{
                columnGap: "4px",
              }}
            >
              {/* Pagination Info */}
              {getImageCountInfo().loadedImages > 0 && (
                <div className="text-sm text-gray-600 font-medium">
                  <span className="mr-8">
                    Showing {getImageCountInfo().startIndex} to{" "}
                  </span>
                  {getImageCountInfo().endIndex} of{" "}
                  {totalCount > 0 ? totalCount.toLocaleString() : "∞"} images
                  {totalPages > 1 && (
                    <span className="ml-8 text-gray-500">
                      • Page {currentPage} of {totalPages}
                    </span>
                  )}
                </div>
              )}

              {/* Compact Pagination Controls */}
              {!error && images.length > 0 && totalPages > 1 && (
                <div
                  className="flex items-center"
                  style={{
                    columnGap: "4px",
                  }}
                >
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className={`px-3 py-1 border rounded text-sm ${
                      currentPage === 1 || isLoading
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    title="Previous page"
                  >
                    ←
                  </button>

                  {/* Page Number Buttons */}
                  <div
                    className="flex items-center"
                    style={{
                      columnGap: "4px",
                    }}
                  >
                    {getPageNumbers().map((page, index) => {
                      if (page === "...") {
                        return (
                          <span
                            key={`dots-${index}`}
                            className="px-2 py-1 text-sm text-gray-400"
                          >
                            ...
                          </span>
                        );
                      }

                      const pageNum = page as number;
                      const isCurrentPage = pageNum === currentPage;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          disabled={isLoading}
                          className={`px-3 py-1 border rounded text-sm min-w-[32px] font-medium ${
                            isCurrentPage
                              ? "bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700 hover:shadow-lg"
                              : isLoading
                              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                          }`}
                          title={`Go to page ${pageNum}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    className={`px-3 py-1 border rounded text-sm ${
                      currentPage === totalPages || isLoading
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    title="Next page"
                  >
                    →
                  </button>

                  {/* Loading Indicator */}
                  {isLoading && (
                    <div className="ml-2 w-3 h-3 border border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: "80px 10px" }}>
        {/* Loading State - Show skeleton on initial load, refresh, or when no images */}
        {isLoading && images.length === 0 && !error ? (
          <SkeletonGrid count={12} />
        ) : null}

        {/* Error State - API failed */}
        {!!error && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Something went wrong
              </h3>
              <p className="text-gray-500 max-w-md mb-4">
                We couldn't load the images. Please check your internet
                connection and try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State - API succeeded but no images */}
        {!isLoading && !error && images.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Images Found
              </h3>
              <p className="text-gray-500 max-w-md">
                We couldn't find any images at the moment. Please try refreshing
                the page or check back later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}

        {/* Gallery with Infinite Scroll */}
        {!error && images.length > 0 && (
          <InfiniteScroll
            dataLength={images.length}
            next={onFetchNextData}
            hasMore={hasMoreData}
            loader={
              isLoading ? <SkeletonGrid count={6} className="mt-4" /> : null
            }
            endMessage={
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#999",
                }}
              >
                <span>You've reached the end! No more images to load.</span>
              </div>
            }
          >
            <div className="container mx-auto px-4">
              <MasonryGrid images={images} onImageClick={handleImageClick} />
            </div>
          </InfiniteScroll>
        )}
      </main>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageData={selectedImageDetails}
        isLoadingImageDetails={isLoadingImageDetails}
      />
    </div>
  );
};

export default Gallery;
