import { createContext, useState } from 'react'

type EditIndicatorContext = {
    openPopUpEditIndicator: boolean,
    setOpenPopUpEditIndicator: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditIndicatorContext = createContext<EditIndicatorContext>({} as EditIndicatorContext);

export const EditIndicatorContextProvider = ({ children } : {children: React.ReactNode}) => {

    const [openPopUpEditIndicator, setOpenPopUpEditIndicator] = useState(false)

    return(
        <EditIndicatorContext.Provider value={{openPopUpEditIndicator, setOpenPopUpEditIndicator}}>
            {children}
        </EditIndicatorContext.Provider>
    )
}