import React from "react";
import type { UnsplashImage } from "../../../types";
import { useMasonryController } from "./masonry-grid-controller";
import { useMasonryImageController } from "./masonry-image-controller";
import "./masonry-grid.css";

interface MasonryGridProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
  gap?: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  images,
  onImageClick,
  gap = 16,
}) => {
  const { containerRef, organizedImages, columnHeights } = useMasonryController(
    {
      images,
      gap,
    }
  );

  return (
    <div
      ref={containerRef}
      className="masonry-container w-full max-w-7xl mx-auto px-4"
      style={{
        minHeight:
          columnHeights.length > 0 ? Math.max(...columnHeights) : "auto",
      }}
    >
      <div className="flex" style={{ gap: `${gap}px` }}>
        {organizedImages.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="masonry-column flex-1 flex flex-col"
            style={{ gap: `${gap}px` }}
          >
            {column.images.map((image) => (
              <MasonryImageItem
                key={`${image.id}-${image.index}`}
                image={image}
                onClick={onImageClick}
                gap={gap}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface MasonryImageItemProps {
  image: UnsplashImage & { index: number };
  onClick: (image: UnsplashImage) => void;
  gap: number;
}

const MasonryImageItem: React.FC<MasonryImageItemProps> = ({
  image,
  onClick,
}) => {
  const {
    imgRef,
    isLoaded,
    hasError,
    handleImageLoad,
    handleImageError,
    handleClick,
    handleKeyDown,
    getImageUrl,
    getImageAlt,
    getImageStyle,
  } = useMasonryImageController({ image, onClick });

  return (
    <div className="masonry-item cursor-pointer">
      <div
        className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-100"
        onClick={handleClick}
        tabIndex={0}
        role="button"
        aria-label={`View image by ${image.user.name}`}
        onKeyDown={handleKeyDown}
      >
        {!isLoaded && (
          <div
            className="w-full bg-gray-200 animate-pulse"
            style={getImageStyle()}
          />
        )}

        {!hasError ? (
          <img
            ref={imgRef}
            src={getImageUrl()}
            alt={getImageAlt()}
            className={`masonry-image w-full h-auto object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-500"
            style={getImageStyle()}
          >
            <span className="text-sm">Failed to load</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasonryGrid;
