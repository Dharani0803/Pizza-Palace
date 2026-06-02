import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PizzaSkeleton() {
  return (
    <div className="p-5">
      
      {/* Banner Skeleton */}
      <Skeleton height={220} borderRadius={12} />

      {/* Section Title */}
      <div className="mt-6">
        <Skeleton width={200} height={30} />
      </div>

      {/* Pizza Cards */}
      <div className="flex gap-5 mt-5 overflow-hidden">
        
        {[1,2,3].map((item) => (
          <div
            key={item}
            className="min-w-[340px] rounded-xl overflow-hidden"
          >
            <Skeleton height={250} />

            <div className="mt-3">
              <Skeleton width={180} height={25} />
              <Skeleton count={2} />
              <Skeleton width={100} height={25} />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default PizzaSkeleton;