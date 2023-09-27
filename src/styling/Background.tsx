import React, { ReactNode } from 'react'; 


const Styling: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-[#952323] 100vh ">
    
      {children}
    </div>
  );
};

export default Styling;