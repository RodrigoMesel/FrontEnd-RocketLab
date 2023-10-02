import React, { useContext } from "react";
import Modal from "react-modal";
import { HighlightsModalContext } from "../context/HighlightsModalContext";
import ColaboratorCardHorizontal from "./ColaboratorCardHorizontal";

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
      maxHeight: "80%"
    },
  };

  return (
    <div>
      <Modal
        isOpen={highlightsContext.isOpen}
        onRequestClose={highlightsContext.handleClose}
        style={customStyles}
      >
        <div className="flex justify-center items-center gap-14">
          <div className="w-12 h-12"></div>
          <p className="font-bold text-lg">Colaboradores</p>
          <div
            onClick={highlightsContext.handleClose}
            className="cursor-pointer w-12 h-12 justify-center items-center flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="#312843"
              />
            </svg>
          </div>
        </div>

        <ul>
          {highlightsContext.colaborators.colaboratorList?.map((item) => (
            <li key={item.id} className="mt-3">
              <ColaboratorCardHorizontal
                name={item.name}
                role={item.role}
                grade={item.grade}
                id={item.id}
              />
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};
export default HighlightsModal;
