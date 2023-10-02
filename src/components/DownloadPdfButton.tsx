import pdfLogo from '../assets/pdf.svg';

interface DownloadPdfButtonProps{
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({onClick}: DownloadPdfButtonProps) => {
  return (
    <button onClick={onClick} className="flex text-[#312843] text-opacity-25 underline underline-offset-2 gap-3">
        <img src={pdfLogo} alt="pdfLogo" />
        Baixar relatório do mês
    </button>
  );
};
export default DownloadPdfButton;
