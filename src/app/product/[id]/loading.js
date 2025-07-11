export default function Loading() {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-pulse">
        {/* Title */}
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/5 mb-6" />
  
        {/* Image */}
        <div className="relative w-full h-80 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl mb-6" />
  
        {/* Description block */}
        <div className="space-y-3 mb-6">
          <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
        </div>
  
        {/* Price + Button placeholder */}
        <div className="flex items-center gap-4 mt-6">
          <div className="h-6 w-20 bg-gradient-to-r from-green-200 via-green-300 to-green-200 rounded" />
          <div className="h-8 w-24 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 rounded" />
        </div>
      </div>
    );
  }
  