import { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import { CartContext } from "./contexts";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    setCart([]);
    setLoading(false);
  }

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(selectedPizza.sizes?.[pizzaSize] ?? "");
  }

  useEffect(() => {
    (async function fetchPizzaTypes() {
      // await new Promise((resolve) => setTimeout(resolve, 4000)); // fake a delay like there's real network delay
      const pizzasRes = await fetch("/api/pizzas");
      const pizzasJson = await pizzasRes.json();
      setPizzaTypes(pizzasJson);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                id="pizza-type"
                name="pizza-type"
                value={loading ? "fetching" : pizzaType}
                onChange={(e) => setPizzaType(e.target.value)}
              >
                {loading ? (
                  <option disabled value="fetching">
                    Fetching menu... 🍽️
                  </option>
                ) : (
                  pizzaTypes.map((pizza, i) => (
                    <option key={pizza.id} value={pizza.id}>
                      {i + " – " + pizza.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <fieldset>
              <legend>Pizza Size</legend>
              <div>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    checked={pizzaSize === "S"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    checked={pizzaSize === "M"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    checked={pizzaSize === "L"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </fieldset>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            {loading ? (
              <h2>LOADING…</h2>
            ) : (
              <>
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={selectedPizza.image}
                />
                <p>{price}</p>
              </>
            )}
          </div>
        </form>
      </div>
      {loading ? <h2>LOADING…</h2> : <Cart checkout={checkout} cart={cart} />}
    </div>
  );
}
