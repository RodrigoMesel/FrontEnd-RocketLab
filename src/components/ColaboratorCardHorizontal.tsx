import { Link } from "react-router-dom";
import { ColaboratorCardI } from "./ColaboratorCard";
import ColaboratorImage from "./ColaboratorImage";
import ColaboratorGrade from "./ColaboratorGrade";

const ColaboratorCardHorizontal: React.FC<ColaboratorCardI> = ({
  name,
  role,
  grade,
  id,
}) => {
  return (
    <>
      <Link to={`/colaborador/${id}`}>
        <div className="flex bg-[#FBFBFB] h-16 w-[22rem] cursor-pointer px-5 py-[0.625rem] justify-between items-center">
          <div className="flex gap-3">
            <ColaboratorImage />
            <div className="flex flex-col">
              <div className="text-sm font-medium">{role}</div>
              <div className="text-lg font-bold">{name}</div>
            </div>
          </div>

          <ColaboratorGrade grade={grade} />
        </div>
      </Link>
    </>
  );
};
export default ColaboratorCardHorizontal;
