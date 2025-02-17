import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import WishlistContextProvider from './Context/WishlistContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <TokenContextProvider>
    <CartContextProvider>
    <WishlistContextProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </WishlistContextProvider>
    </CartContextProvider>
  </TokenContextProvider>
)
