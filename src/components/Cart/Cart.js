import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((cartitem) => (
          <CartItem
            key={cartitem.id}
            item={{
              id: cartitem.id,
              title: cartitem.name,
              quantity: cartitem.quantity,
              total: cartitem.totalprice,
              price: cartitem.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
