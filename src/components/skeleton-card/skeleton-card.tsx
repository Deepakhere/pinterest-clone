import React from "react";

interface SkeletonCardProps {
  height?: number;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  height = 250,
  className = "",
}) => {
  return (
    <div className={`break-inside-avoid mb-4 ${className}`}>
      <div
        className="relative overflow-hidden rounded-lg shadow-md bg-gray-100 group cursor-pointer"
        style={{ height: `${height}px` }}
      >
        {/* Main skeleton background with shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />

        {/* Overlay content skeleton - only visible on hover like real cards */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
          {/* User name skeleton */}
          <div className="h-4 bg-white/30 rounded w-3/4" />

          {/* Description skeleton */}
          <div className="space-y-1">
            <div className="h-3 bg-white/20 rounded w-full" />
            <div className="h-3 bg-white/20 rounded w-2/3" />
          </div>

          {/* Stats skeleton */}
          <div className="flex justify-between items-center pt-2">
            <div className="h-3 bg-white/20 rounded w-12" />
            <div className="h-3 bg-white/20 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
