import { useState, useRef } from "react";
import type { UnsplashImage } from "../../../types";

interface UseMasonryImageControllerProps {
  image: UnsplashImage & { index: number };
  onClick: (image: UnsplashImage) => void;
}

export const useMasonryImageController = ({
  image,
  onClick,
}: UseMasonryImageControllerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleClick = () => {
    onClick(image);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const getImageUrl = () => {
    return `${image.urls.raw}&w=400&q=80&fm=jpg&fit=max`;
  };

  const getImageAlt = () => {
    return image.alt_description || image.description || "Unsplash image";
  };

  const getImageStyle = () => {
    return {
      aspectRatio: `${image.width}/${image.height}`,
      minHeight: "200px",
    };
  };

  return {
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
  };
};
