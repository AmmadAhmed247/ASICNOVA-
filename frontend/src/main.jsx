import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Homepage from './pages/homepage.jsx'
import Singlepage from './pages/singlepage.jsx'
import Products from './pages/products.jsx'
import Mainlayout from '../libs/mainlayout.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/products', element: <Products /> },
      { path: '/products/:id', element: <Singlepage /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
