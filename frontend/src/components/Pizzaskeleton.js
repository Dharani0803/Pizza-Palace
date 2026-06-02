import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PizzaSkeleton() {
  return (
    <div className="p-4 bg-white rounded-md shadow">
      <Skeleton height={150} />
      <Skeleton count={2} className="mt-2" />
      <Skeleton width={80} />
    </div>
  );
}

export default PizzaSkeleton;