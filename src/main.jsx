import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from "./Redux/store";
  import { Provider as ReduxProvider } from "react-redux";
  import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
  import { ThemeProvider } from "next-themes"
  import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter> 
   <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
       
          <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
        </ThemeProvider>
        </ChakraProvider>
        </BrowserRouter> 
   </StrictMode>,
)
