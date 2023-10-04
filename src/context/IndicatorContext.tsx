import { createContext, useState } from 'react'

type IndicatorContext = {
    openPopUpIndicator: boolean,
    setOpenPopUpIndicator: React.Dispatch<React.SetStateAction<boolean>>
}

export const IndicatorContext = createContext<IndicatorContext>({} as IndicatorContext);

export const IndicatorContextProvider = ({ children } : {children: React.ReactNode}) => {

    const [openPopUpIndicator, setOpenPopUpIndicator] = useState(false)

    return(
        <IndicatorContext.Provider value={{openPopUpIndicator, setOpenPopUpIndicator}}>
            {children}
        </IndicatorContext.Provider>
    )
}
