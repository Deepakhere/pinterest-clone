import React, { useMemo } from "react";
import SkeletonCard from "../skeleton-card";
import { useResponsiveColumns } from "../../hooks/use-responsive-columns";

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  count = 12,
  className = "",
}) => {
  const { columnCount } = useResponsiveColumns();

  // Generate random heights for more realistic skeleton
  const skeletonHeights = useMemo(() => {
    const heights = [];
    for (let i = 0; i < count; i++) {
      // Random heights between 200-400px for variety
      heights.push(Math.floor(Math.random() * 200) + 200);
    }
    return heights;
  }, [count]);

  // Organize skeleton cards into columns
  const organizedSkeletons = useMemo(() => {
    const columns: number[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = Array(columnCount).fill(0);

    skeletonHeights.forEach((height, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.reduce(
        (minIndex, currentHeight, currentIndex) =>
          currentHeight < columnHeights[minIndex] ? currentIndex : minIndex,
        0
      );

      // Add skeleton to the shortest column
      columns[shortestColumnIndex].push(index);
      columnHeights[shortestColumnIndex] += height + 16; // 16px gap
    });

    return columns;
  }, [columnCount, skeletonHeights]);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 ${className}`}>
      <div className="flex gap-4">
        {organizedSkeletons.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 flex flex-col gap-4">
            {column.map((skeletonIndex) => (
              <SkeletonCard
                key={skeletonIndex}
                height={skeletonHeights[skeletonIndex]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonGrid;
