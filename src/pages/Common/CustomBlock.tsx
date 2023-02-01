import React from "react";

interface CustomBlock {
  title: string;
  subTitle:string;
}

const CustomBlock: React.FC<CustomBlock> = ({title, subTitle}) => {
  return (
    <div>
      <div className="fw-bold">{title}</div>
      <div>{subTitle}</div>
  </div>
  );
};

export default CustomBlock;



