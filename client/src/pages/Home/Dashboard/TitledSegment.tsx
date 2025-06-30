import React, { ReactNode } from "react";

function TitledSegment({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-xl font-bold">{title}</h3>
      {children}
    </div>
  );
}

export default TitledSegment;
