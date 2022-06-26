import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "./hooks/use-http";
import { useEffect, Fragment } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const dataSent = () => {
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success",
        message: "Cart Data has been sent",
      })
    );
  };
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );
    sendRequest(
      {
        url: "https://react-http-51a82-default-rtdb.firebaseio.com/cart.json",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      },
      dataSent.bind(null)
    );
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
