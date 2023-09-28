import React from "react";
import ColaboratorImage from "./ColaboratorImage";
import ColaboratorGrade from "./ColaboratorGrade";

const ColaboratorCard: React.FC = () => {
  return (
    <>
      <div className="flex flex-col rounded-2xl bg-[#FBFBFB] h-44 w-40 text-center items-center text-[#312843]">
        <div className="flex items-center mt-5">
          <ColaboratorImage />
        </div>
        <div className="font-bold mt-1">Alice Martins</div>
        <div className="">Marketing</div>

        <ColaboratorGrade grade={5} />
      </div>
    </>
  );
};

export default ColaboratorCard;
