import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <Skeleton count={5} highlightColor="#A0A0A0"/>
  );
};

export default LoadingSkeleton;
