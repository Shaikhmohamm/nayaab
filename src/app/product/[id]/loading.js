export default function Loading() {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="relative w-full h-80 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-6 bg-green-200 rounded w-1/4 mt-6"></div>
        </div>
      </div>
    );
  }
  