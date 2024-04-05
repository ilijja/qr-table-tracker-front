import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Root";
import { action as loginUserAction } from "./pages/LoginPage";
import { action as registerUserAction } from "./pages/RegisterPage";
import { checkAuthLoader, checkIfLogged } from "./util/auth";
import { action as logoutAction } from "./pages/actions/Logout";
import ProductsPage from "./pages/ProductsPage";
import { action as addMenuAction } from "./pages/ProductsPage";
import MenuPage from "./pages/MenuPage";
import { action as addCategoryAction } from "./pages/MenuPage";
import { loader as menuLoader } from "./pages/ProductsPage";
import { loader as categoryLoader } from "./pages/MenuPage";
import { tokenLoader } from "./util/auth";
import DashboardLayout from "./pages/Dashboard";
import { action as addProductAction } from "./pages/SingleProductPage";
import { action as deleteCategoryAction } from "./pages/actions/DeleteCategory";
import { action as deleteProductAction } from "./pages/actions/DeleteProduct";
import { loader as homeLoader } from "./pages/HomePage";
import { action as homeAction } from "./pages/HomePage";
import UserMenuPage from "./pages/UserMenuPage";
import { action as userMenuAction } from "./pages/UserMenuPage";
import { loader as userMenuLoader } from "./pages/UserMenuPage";
import MapPage from "./pages/MapPage";
import { loader as mapLoader } from "./pages/MapPage";
import { action as addMapAction } from "./pages/MapPage";
import { loader as orderMenuLoader } from "./pages/OrderMenuPage";
import { action as orderMenuAction } from "./pages/OrderMenuPage";
import OrderMenuPage from "./pages/OrderMenuPage";
import PaymentPage, {action as paymentAction, loader as paymentLoader} from './pages/PaymentPage'
import TablePage from "./pages/TablePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: tokenLoader,
    id: "root",
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "home",
            element: <HomePage />,
            loader: homeLoader,
            action: homeAction,
          },
          {
            path: "products",
            action: addMenuAction,
            loader: checkAuthLoader,
            children: [
              {
                path: "",
                element: <ProductsPage />,
                loader: menuLoader,
              },
              {
                path: ":id",
                element: <MenuPage />,
                action: addCategoryAction,
                loader: categoryLoader,
                children: [
                  {
                    element: null,
                    path: "addProduct",
                    action: addProductAction,
                  },
                  {
                    element: null,
                    path: "deleteProduct/:productId",
                    action: deleteProductAction,
                  },
                  {
                    element: null,
                    path: "deleteCategory/:categoryId",
                    action: deleteCategoryAction,
                  },
                ],
              },
            ],
          },
          {
            path: "maps",
            element: <MapPage />,
            loader: mapLoader,
            action: addMapAction,
          },
        ],
      },
      {
        path: "menu",
        children: [
          {
            path: ":id",
            children: [
              {
                path: "",
                element: <UserMenuPage />,
                loader: userMenuLoader,
                action: userMenuAction,
              },
              {
                path: ":menuId",
                element: <OrderMenuPage />,
                action: orderMenuAction,
                loader: orderMenuLoader,
              },
            ],
          },
        ],
      },
      {
        path: 'table',
        children: [
          {
            path: ':id',
            element: <TablePage/>,
          }
        ]
      },
      {
        path: "payment",
        children: [
          {
            path: ":id",
            element: <PaymentPage/>,
            loader: paymentLoader,
            action: paymentAction,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginUserAction,
        loader: checkIfLogged,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerUserAction,
        loader: checkIfLogged,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
