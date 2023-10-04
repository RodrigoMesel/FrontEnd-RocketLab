import { createContext, useState } from 'react'

type CreateIndicatorContext = {
    openPopUpCreateIndicator: boolean,
    setOpenPopUpCreateIndicator: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateIndicatorContext = createContext<CreateIndicatorContext>({} as CreateIndicatorContext);

export const CreateIndicatorContextProvider = ({ children } : {children: React.ReactNode}) => {

    const [openPopUpCreateIndicator, setOpenPopUpCreateIndicator] = useState(false)

    return(
        <CreateIndicatorContext.Provider value={{openPopUpCreateIndicator, setOpenPopUpCreateIndicator}}>
            {children}
        </CreateIndicatorContext.Provider>
    )
}
