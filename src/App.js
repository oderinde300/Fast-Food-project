import { useState } from "react";

import NavBar from "./components/Layout/NavBar";
import classes from './App.module.css'
import Banner from "./components/Layout/Banner";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Checkout from "./components/Checkout/Checkout";

function App(props) {
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);

  const showCheckoutHandler = () => {
    setCheckoutIsShown(true);
  };


  const hideCheckoutHandler = () => {
    setCheckoutIsShown(false);
  }

  return (
    <CartProvider>
      <section className={classes.container}>
        <section className={classes.main}>
          {checkoutIsShown && <Checkout onHideCheckout={hideCheckoutHandler} />}
          <header>
            <NavBar />
            <Banner />
          </header>
          <main>
            <Meals />
          </main>
        </section>
        <section className={classes.aside}>
          <aside>
            <Cart onShowCheckout={showCheckoutHandler} />
          </aside>
        </section>
      </section>
    </CartProvider>
  );
}

export default App;
