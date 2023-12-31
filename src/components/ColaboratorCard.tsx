import React from "react";
import ColaboratorImage from "./ColaboratorImage";
import ColaboratorGrade from "./ColaboratorGrade";
import { Link } from "react-router-dom";

export interface ColaboratorCardI {
  name: string;
  role: string;
  grade: number;
  id: number;
}

const ColaboratorCard: React.FC<ColaboratorCardI> = ({
  name,
  role,
  grade,
  id,
}) => {
  return (
    <>
      <Link to={`/colaborador/${id}`}>
        <div className="flex flex-col rounded-2xl bg-[#FBFBFB] h-44 w-40 text-center items-center text-[#312843] cursor-pointer">
          <div className="flex items-center mt-5">
            <ColaboratorImage />
          </div>
          <div className="font-bold mt-1">{name}</div>
          <div className="">{role}</div>

          <ColaboratorGrade grade={grade} />
        </div>
      </Link>
    </>
  );
};

export default ColaboratorCard;
