function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="animate-pulse">
          
          {/* Image */}
          <div className="h-80 bg-gray-300 rounded-md"></div>

          {/* Text */}
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
            <div className="h-3 bg-gray-200 w-full rounded"></div>
            <div className="h-3 bg-gray-200 w-3/4 rounded"></div>

            <div className="flex justify-between mt-3">
              <div className="h-5 w-16 bg-gray-300 rounded"></div>
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default MenuSkeleton;