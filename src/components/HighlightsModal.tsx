import React, { useContext } from "react";
import Modal from "react-modal";
import { HighlightsModalContext } from "../context/HighlightsModalContext";

Modal.setAppElement("#root");

const HighlightsModal: React.FC = () => {
  const highlightsContext = useContext(HighlightsModalContext);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <Modal
        isOpen={highlightsContext.isOpen}
        onRequestClose={highlightsContext.handleClose}
        style={customStyles}
      >
        <h1>Colaboradores</h1>
        <ul>
          {highlightsContext.colaborators.colaboratorList?.map((item) => (
            <li key={item.id}>
              {item.name} {""} {item.grade}
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};
export default HighlightsModal;
