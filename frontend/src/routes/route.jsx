import { createBrowserRouter } from "react-router-dom";
import Homepage from '../pages/HomePage/homepage.jsx'
import Singlepage from '../pages/Single Page/singlepage.jsx'
import Products from '../pages/Products/products.jsx'
import Mainlayout from '../lib/Layouts/mainlayout.jsx'
import Login from "../pages/Auth/Login.jsx";
import SignUp from "../pages/Auth/SignUp.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";
import ContactSalesPage from "../pages/Contact/Contact.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/products', element: <Products /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/contact', element: <ContactSalesPage /> },
      { path: '/products/:id', element: <Singlepage /> },
    ]
  }
])

export default router;
