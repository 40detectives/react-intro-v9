import Pizza from "./Pizza";

export default function Order() {
  const pizzaType = "pepperoni";
  const pizzaSize = "M";

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select id="pizza-type" name="pizza-type" value={pizzaType}>
              <option value="pepperoni">The Pepperoni Pizza</option>
              <option value="hawaiian">The Hawaiian Pizza</option>
              <option value="big_meat">The Big Meat</option>
            </select>
          </div>
          <div>
            {/* TODO: THIS <LABEL> IS WEIRD, CHANGE IT TO SOMETHING ELSE */}
            <label>Pizza Size</label>
            <div>
              <span>
                <input
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  checked={pizzaSize === "S"}
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
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          <Pizza
            name="Pepperoni Pizza"
            description="Mozzarella Cheese, Pepperoni"
            image={"/public/pizzas/pepperoni.webp"}
          />
          <p>19.23€</p>
        </div>
      </form>
    </div>
  );
}
