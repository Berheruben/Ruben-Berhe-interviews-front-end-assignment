import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300">
      <Skeleton height={192} />
      <div className="p-4">
        <Skeleton height={24} width="80%" />
        <Skeleton count={3} />
      </div>
    </div>
  );
};

export default SkeletonCard;
