import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SortedByProvider } from './context/SortedByContext.tsx'
import { FilterProvider } from './context/FilterContext.tsx'
import { CreateColaboratorListProvider } from './context/CreateColaboratorListContext.tsx'
import { CreateIndicatorContextProvider } from './context/CreateIndicatorContext.tsx'
import { IndicatorContextProvider } from './context/IndicatorContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SortedByProvider>
      <FilterProvider>
        <CreateColaboratorListProvider>
          <IndicatorContextProvider>
          <CreateIndicatorContextProvider>
            <App />
            </CreateIndicatorContextProvider>
          </IndicatorContextProvider>
        </CreateColaboratorListProvider>
      </FilterProvider>
    </SortedByProvider>
  </React.StrictMode>,
)
