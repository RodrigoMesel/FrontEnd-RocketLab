interface ColaboratorGradeProps {
  grade: number;
}

const ColaboratorGrade: React.FC<ColaboratorGradeProps> = ({ grade }) => {
  /** 0-1 vermelho, 1-2 roxo, 2-4 verde, 4-5 azul */

  const color =
    grade <= 1
      ? "bg-[#F16062]"
      : grade <= 2
      ? "bg-[#AC72C1]"
      : grade < 4
      ? "bg-[#32B97C]"
      : "bg-[#6186D3]";

  return (
    <>
      <div
        className={`flex items-center space-x-1 rounded-xl pr-1 pl-1 ${color} h-8 w-[4.313rem] justify-center text-center text-white font-bold`}
      >
        <img src="./src/assets/grade.svg" className="" />
        <div className="">{grade}</div>
      </div>
    </>
  );
};
export default ColaboratorGrade;
