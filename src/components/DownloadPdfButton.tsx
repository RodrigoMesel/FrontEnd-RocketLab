import pdfLogo from "../assets/pdf.svg";

interface DownloadPdfButtonProps {
  disabled: boolean;
}

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({
  disabled,
}: DownloadPdfButtonProps) => {
  return (
    <button
      disabled={disabled}
      className="flex text-[#312843] disabled:text-opacity-25 underline underline-offset-2 gap-3"
    >
      <img src={pdfLogo} alt="pdfLogo" />
      Baixar relatório do mês
    </button>
  );
};
export default DownloadPdfButton;
