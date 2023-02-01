import React from "react";

interface CustomLabel {
  title: string;
}

const CustomLabel : React.FC<CustomLabel> = ({title}) => {
  return (
    <div className="d-flex align-items-center gap-1">
      <div>{title}</div>
    </div>
  );
};

export default CustomLabel;
