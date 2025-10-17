import { useState, useEffect } from "react";
import { GALLERY_CONFIG } from "../utils/enums";

/**
 * Custom hook for responsive column management in masonry layout
 * Follows Pinterest-style responsive breakpoints:
 * - Mobile (< 640px): 1 column
 * - Small Tablet (640px - 768px): 2 columns
 * - Tablet (768px - 1024px): 3 columns
 * - Desktop (1024px - 1280px): 4 columns
 * - Large Desktop (>= 1280px): 5 columns
 */
export const useResponsiveColumns = () => {
  const [columns, setColumns] = useState(1);
  const [screenSize, setScreenSize] = useState<
    "mobile" | "smallTablet" | "tablet" | "desktop" | "largeDesktop"
  >("mobile");

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      if (width < GALLERY_CONFIG.breakpoints.mobile) {
        setColumns(GALLERY_CONFIG.columns.mobile);
        setScreenSize("mobile");
      } else if (width < GALLERY_CONFIG.breakpoints.smallTablet) {
        setColumns(GALLERY_CONFIG.columns.smallTablet);
        setScreenSize("smallTablet");
      } else if (width < GALLERY_CONFIG.breakpoints.tablet) {
        setColumns(GALLERY_CONFIG.columns.tablet);
        setScreenSize("tablet");
      } else if (width < GALLERY_CONFIG.breakpoints.desktop) {
        setColumns(GALLERY_CONFIG.columns.desktop);
        setScreenSize("desktop");
      } else {
        setColumns(GALLERY_CONFIG.columns.largeDesktop);
        setScreenSize("largeDesktop");
      }
    };

    // Initial calculation
    updateColumns();

    // Debounced resize handler
    let timeoutId: number;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateColumns, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { columnCount: columns, columns, screenSize };
};
