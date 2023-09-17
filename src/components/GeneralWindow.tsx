import React, { ReactNode } from 'react'; 

const GeneralWindow: React.FC<{ children: ReactNode }> = ({ children }) => {
    return(

        <nav className="bg-[#FFFFFF] p-5 w-full h-full rounded-3xl">
            {children}
        </nav>
    );

}
export default GeneralWindow;