import { createBrowserRouter } from "react-router-dom";
import Homepage from '../pages/HomePage/homepage.jsx'
import Singlepage from '../pages/Single Page/singlepage.jsx'
import Products from '../pages/Products/products.jsx'
import Mainlayout from '../lib/Layouts/mainlayout.jsx'
import Login from "../pages/Auth/Login.jsx";
import SignUp from "../pages/Auth/SignUp.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";
import ContactSalesPage from "../pages/Contact/Contact.jsx";
import Admin from "../pages/Admin/Admin.jsx";
import Unauthorized from "../pages/Error Pages/Unauthorized.jsx";
import NotFound from "../pages/Error Pages/NotFound.jsx";
import ProtectedRoute from "./protected-route.jsx";
import ResetPassword from "../pages/Auth/ResetPassword.jsx";
import Checkout from "../pages/CheckoutPage/Checkout.jsx";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/products', element: <Products /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/resetpassword', element: <ResetPassword /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/contact', element: <ContactSalesPage /> },
      {
        path: '/admin',
        element: <ProtectedRoute/>,
        children: [
          {path: '', element: <Admin/>}
        ]
      },
      { path: '/products/:id', element: <Singlepage /> },
      {path: '/unauthorized', element: <Unauthorized/>},
      {path: '*', element: <NotFound/>}
    ]
  }
])

export default router;
