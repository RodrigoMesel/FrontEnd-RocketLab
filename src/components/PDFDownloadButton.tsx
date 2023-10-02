import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile, { PDFProps } from "./PDFFile";

const PDFDownloadButton: React.FC<PDFProps> = ({
  id,
  name,
  grade,
  role,
  doughnutChart,
  monthIndicators,
  nothingIndicators,
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
          />
        }
        fileName={name}
      >
        {({ loading }) =>
          loading ? (
            <button disabled={true}>Loading</button>
          ) : (
            <button>Download</button>
          )
        }
      </PDFDownloadLink>
    </>
  );
};
export default PDFDownloadButton;
