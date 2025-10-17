import { useEffect, useState, useRef, useCallback } from "react";
import type { UnsplashImage } from "../../../types";
import { useResponsiveColumns } from "../../../hooks/use-responsive-columns";

interface MasonryColumn {
  height: number;
  images: (UnsplashImage & { index: number })[];
}

interface UseMasonryControllerProps {
  images: UnsplashImage[];
  gap?: number;
}

export const useMasonryController = ({
  images,
  gap = 16,
}: UseMasonryControllerProps) => {
  const { columns: columnCount } = useResponsiveColumns();
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const [organizedImages, setOrganizedImages] = useState<MasonryColumn[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate image height based on aspect ratio and column width
  const calculateImageHeight = useCallback(
    (image: UnsplashImage, columnWidth: number) => {
      const aspectRatio = image.width / image.height;
      return columnWidth / aspectRatio;
    },
    []
  );

  // Organize images into columns using a greedy algorithm (shortest column first)
  const organizeImages = useCallback(() => {
    if (!containerRef.current || images.length === 0) return;

    const containerWidth = containerRef.current.offsetWidth;
    const totalGap = (columnCount - 1) * gap;
    const columnWidth = (containerWidth - totalGap) / columnCount;

    // Initialize columns
    const columns: MasonryColumn[] = Array.from(
      { length: columnCount },
      () => ({
        height: 0,
        images: [],
      })
    );

    // Distribute images to columns
    images.forEach((image, index) => {
      const imageHeight = calculateImageHeight(image, columnWidth);

      // Find the shortest column
      const shortestColumnIndex = columns.reduce(
        (minIndex, column, currentIndex) =>
          column.height < columns[minIndex].height ? currentIndex : minIndex,
        0
      );

      // Add image to the shortest column
      columns[shortestColumnIndex].images.push({ ...image, index });
      columns[shortestColumnIndex].height += imageHeight + gap;
    });

    setOrganizedImages(columns);
    setColumnHeights(columns.map((col) => col.height));
  }, [images, columnCount, gap, calculateImageHeight]);

  // Reorganize when images, column count, or container size changes
  useEffect(() => {
    organizeImages();
  }, [organizeImages]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(organizeImages, 100); // Debounce resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [organizeImages]);

  return {
    containerRef,
    organizedImages,
    columnHeights,
    gap,
  };
};
