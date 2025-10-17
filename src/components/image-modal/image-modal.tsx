import type { UnsplashImage } from "../../types";

const UnsplashImageModal = ({
  isOpen,
  onClose,
  imageData,
  isLoadingImageDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageData: UnsplashImage | null;
  isLoadingImageDetails: boolean;
}) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
      style={{
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 mx-4"
        style={{
          backgroundColor: "white",
          maxWidth: "1000px",
          width: "95%",
          maxHeight: "90vh",
          position: "relative",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          animation: "modalFadeScale 0.3s ease-out",
          transformOrigin: "center center",
        }}
      >
        <div className="flex gap-6 h-full p-[20px]">
          {/* Left Side: Image or Skeleton */}
          <div className="w-1/2 bg-black h-[500px] rounded-lg overflow-hidden">
            {isLoadingImageDetails ? (
              <div className="h-full w-full bg-gray-800 animate-pulse"></div>
            ) : (
              <img
                src={imageData?.urls?.regular}
                alt={imageData?.alt_description as string}
                className="object-cover h-full w-full"
              />
            )}
          </div>

          {/* Right Side: Details or Skeleton */}
          <div className="w-1/2 flex flex-col gap-4">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-black text-xl cursor-pointer"
                onClick={onClose}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-[20px]">
              {isLoadingImageDetails ? (
                // Skeleton content
                <div className="animate-pulse space-y-4 mt-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                  <div className="flex items-center mt-6">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>

                  <div className="h-4 bg-gray-200 rounded w-1/4 mt-4"></div>
                </div>
              ) : (
                // Actual content
                <>
                  <h2 className="text-xl font-semibold mb-2 capitalize">
                    {imageData?.alt_description || "Untitled"}
                  </h2>

                  <p className="text-sm text-gray-600 m-[4px]">
                    {imageData?.description || "No description."}
                  </p>

                  <div className="flex items-center mb-4 gap-x-[4px]">
                    <img
                      src={imageData?.user?.profile_image?.small}
                      alt={imageData?.user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium mx-2">
                      {imageData?.user?.name}
                    </span>

                    <div className="text-sm text-gray-500">
                      ❤️ {imageData?.likes} likes
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsplashImageModal;
