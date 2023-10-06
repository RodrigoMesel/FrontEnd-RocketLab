import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile, { PDFProps } from "./PDFFile";
import DownloadPdfButton from "./DownloadPdfButton";
import { getMonthName } from "../utils/getMonthName";

const PDFDownloadButton: React.FC<PDFProps> = ({
  isActive,
  id,
  name,
  grade,
  role,
  doughnutChart,
  doughnutChartHollow,
  monthIndicators,
  nothingIndicators,
  monthNumber,
  validP,
  goalP,
  superGoalP,
  challengeP,
  nothingP,
  monthGrade,
}) => {
  const currentMonth = new Date().getMonth() + 1;
  return (
    <>
      {currentMonth != monthNumber ? (
        <PDFDownloadLink
          document={
            <PDFFile
              doughnutChart={doughnutChart}
              doughnutChartHollow={doughnutChartHollow}
              id={id}
              name={name}
              role={role}
              grade={grade}
              monthIndicators={monthIndicators}
              nothingIndicators={nothingIndicators}
              monthNumber={monthNumber}
              validP={validP}
              goalP={goalP}
              superGoalP={superGoalP}
              challengeP={challengeP}
              nothingP={nothingP}
              monthGrade={monthGrade}
            />
          }
          fileName={name + "_" + getMonthName(monthNumber - 1)}
        >
          {({ loading }) =>
            loading ? (
              <DownloadPdfButton disabled={true}></DownloadPdfButton>
            ) : (
              <DownloadPdfButton disabled={false}></DownloadPdfButton>
            )
          }
        </PDFDownloadLink>
      ) : (
        <DownloadPdfButton disabled={true}></DownloadPdfButton>
      )}
    </>
  );
};
export default PDFDownloadButton;
