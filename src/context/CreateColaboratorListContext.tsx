import { createContext, useState } from 'react'

type CreateColaboratorListContext = {
    openCreatePopUp: boolean,
    setOpenCreatePopUp: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateColaboratorListContext = createContext<CreateColaboratorListContext>({} as CreateColaboratorListContext);

export const CreateColaboratorListProvider = ({ children } : {children: React.ReactNode}) => {

    const [openCreatePopUp, setOpenCreatePopUp] = useState(false)

    return(
        <CreateColaboratorListContext.Provider value={{openCreatePopUp, setOpenCreatePopUp}}>
            {children}
        </CreateColaboratorListContext.Provider>
    )
}
