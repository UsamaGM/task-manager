import { Loader } from "@/components";
import { TitledSegmentProps } from "type";

function TitledSegment({
  title,
  children,
  showLoading = false,
}: TitledSegmentProps) {
  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-xl font-bold">{title}</h3>
      {showLoading ? <Loader /> : children}
    </div>
  );
}

export default TitledSegment;
