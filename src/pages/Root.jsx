import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { UserProgressContextProvider } from "../store/UserProgressContext";
import { ProductContextProvider } from "../store/ProductContext";
import { MapContextProvider } from "../store/MapContext";
import { useLocation } from "react-router-dom";
import { CartContextProvider } from "../store/CartContext";
import { OrderContextProvider } from "../store/OrderContext";

const RootLayout = () => {
  const token = useLoaderData();
  const location = useLocation();

  const isMenuRoute = location.pathname.startsWith("/menu");

  return (
    <>
      {!token && !isMenuRoute && <MainNavigation />}
      <main>
        <UserProgressContextProvider>
          <ProductContextProvider>
            <MapContextProvider>
              <CartContextProvider>
                <OrderContextProvider>
                  <Outlet />
                </OrderContextProvider>
              </CartContextProvider>
            </MapContextProvider>
          </ProductContextProvider>
        </UserProgressContextProvider>
      </main>
    </>
  );
};

export default RootLayout;
