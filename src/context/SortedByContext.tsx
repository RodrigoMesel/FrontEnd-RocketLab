import { createContext, useState } from 'react'

type SortedByProps = {
    sortedByName: boolean,
    setSortedByName: React.Dispatch<React.SetStateAction<boolean>>
}

export const SortedByContext = createContext<SortedByProps>({} as SortedByProps);

export const SortedByProvider = ({ children } : {children: React.ReactNode}) => {

    const [sortedByName, setSortedByName] = useState<boolean>(true)

    return(
        <SortedByContext.Provider value={{sortedByName, setSortedByName}}>
            {children}
        </SortedByContext.Provider>
    )
}
