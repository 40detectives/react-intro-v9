import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header";
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";
import { CartContext } from "./contexts";

export const App = () => {
  const cartHook = useState([]);

  return (
    <CartContext.Provider value={cartHook}>
      <div>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </div>
    </CartContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
