import { createContext, useState } from 'react'

type AssignIndicatorContext = {
    openPopUpAssignIndicator: boolean,
    setOpenPopUpAssignIndicator: React.Dispatch<React.SetStateAction<boolean>>
}

export const AssignIndicatorContext = createContext<AssignIndicatorContext>({} as AssignIndicatorContext);

export const AssignIndicatorContextProvider = ({ children } : {children: React.ReactNode}) => {

    const [openPopUpAssignIndicator, setOpenPopUpAssignIndicator] = useState(false)

    return(
        <AssignIndicatorContext.Provider value={{openPopUpAssignIndicator, setOpenPopUpAssignIndicator}}>
            {children}
        </AssignIndicatorContext.Provider>
    )
}
