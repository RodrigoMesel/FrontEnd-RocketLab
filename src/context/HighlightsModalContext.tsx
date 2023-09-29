import { ReactNode, createContext, useState } from "react";

interface colaboratorI {
  id: number;
  name: string;
  grade: number;
  role: string;
}

interface colaboratorsI {
  colaboratorList?: colaboratorI[];
}

interface HighlightsModalContext {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: (colaborators: colaboratorsI) => void;
  colaborators: colaboratorsI;
}

export const HighlightsModalContext = createContext<HighlightsModalContext>({
  isOpen: false,
  handleClose: () => {},
  handleOpen: (_) => {},
  colaborators: { colaboratorList: [] },
});

export const HighlightsModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [colaborators, setColaborators] = useState<colaboratorsI>({
    colaboratorList: [],
  });

  function handleClose() {
    setIsOpen(false);
  }
  function handleOpen(colaborators: colaboratorsI) {
    setIsOpen(true);

    if (colaborators) setColaborators(colaborators);
  }

  return (
    <HighlightsModalContext.Provider
      value={{ isOpen, colaborators, handleClose, handleOpen }}
    >
      {children}
    </HighlightsModalContext.Provider>
  );
};
