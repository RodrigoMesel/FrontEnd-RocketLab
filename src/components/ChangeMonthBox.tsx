import {getMonthName} from '../utils/getMonthName'

interface StatsTextBoxProps {
  monthNumber: number;
}

const StatsTextBox: React.FC<StatsTextBoxProps> = ({ monthNumber }) => {
  return (
    <>
      <div className="rounded-xl border border-solid w-fit px-2.5 py-1 border-[#D9D9D9]">
        <p className="font-medium text-base text-[#A3A3A3]">{getMonthName(monthNumber)}</p>
      </div>
    </>
  );
};
export default StatsTextBox;
