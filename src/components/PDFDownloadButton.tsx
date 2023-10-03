import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile, { PDFProps } from "./PDFFile";
import DownloadPdfButton from "./DownloadPdfButton";
import { getMonthName } from "../utils/getMonthName";

const PDFDownloadButton: React.FC<PDFProps> = ({
  id,
  name,
  grade,
  role,
  doughnutChart,
  monthIndicators,
  nothingIndicators,
  monthNumber,
}) => {
  return (
    <>
      <PDFDownloadLink
        document={
          <PDFFile
            doughnutChart={doughnutChart}
            id={id}
            name={name}
            role={role}
            grade={grade}
            monthIndicators={monthIndicators}
            nothingIndicators={nothingIndicators}
            monthNumber={monthNumber}
          />
        }
        fileName={name + "_" + getMonthName(monthNumber)}
      >
        {({ loading }) =>
          loading ? (
            <DownloadPdfButton disabled={true}></DownloadPdfButton>
          ) : (
            <DownloadPdfButton disabled={false}></DownloadPdfButton>
          )
        }
      </PDFDownloadLink>
    </>
  );
};
export default PDFDownloadButton;
