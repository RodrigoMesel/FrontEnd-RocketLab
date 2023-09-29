import { createContext, useState } from 'react'

type FilterContext = {
    filterText: string,
    setFilterText: React.Dispatch<React.SetStateAction<string>>
}

export const FilterContext = createContext<FilterContext>({} as FilterContext);

export const FilterProvider = ({ children } : {children: React.ReactNode}) => {

    const [filterText, setFilterText] = useState<string>('')

    return(
        <FilterContext.Provider value={{filterText, setFilterText}}>
            {children}
        </FilterContext.Provider>
    )
}
