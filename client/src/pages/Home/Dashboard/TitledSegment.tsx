import { TitledSegmentProps } from "type";

function TitledSegment({ title, children }: TitledSegmentProps) {
  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-xl font-bold">{title}</h3>
      {children}
    </div>
  );
}

export default TitledSegment;
