const App = () => {
  return React.createElement(
    "div",
    {} /* here goes any attribute for the element like "id", etc */,
    React.createElement("h1", {}, "Pixel Perfect Pizzas")
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
