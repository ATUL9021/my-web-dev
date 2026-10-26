import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />

      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>The pizza Rect</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.length > 0 ? (
        <React.Fragment key={1}>
          <p>my piza italina african japanese indian please come and try</p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => {
              return (
                <Pizza
                  name={pizza.name}
                  ingredients={pizza.ingredients}
                  price={pizza.price}
                  photoName={pizza.photoName}
                  soldOut={pizza.soldOut}
                  key={pizza.name}
                />
              );
            })}
          </ul>
        </React.Fragment>
      ) : (
        <p>We are working on it </p>
      )}
    </main>
  );
}

function Pizza(props) {
  return (
    <li>
      <div className={`pizza ${props.soldOut ? "sold-out" : ""}`}>
        <img src={props.photoName} alt="my pizza"></img>
        <div>
          <h3>{props.name}</h3>
          <p>{props.ingredients}</p>
          <span>{props.soldOut ? "SOLD OUT" : props.price}</span>
        </div>
      </div>
    </li>
  );
}

function Footer() {
  const currentTime = 22;
  console.log(currentTime);
  const startTime = 12;
  const endTime = 24;
  const isOpen = currentTime >= startTime && currentTime <= endTime;
  return (
    <footer className="footer">
      {isOpen ? (
        <h1>
          we are open from {startTime} to {endTime}. come visit ur or order
          online
        </h1>
      ) : (
        <h1>we are closed</h1>
      )}
    </footer>
  );
}

// //for react version 18
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// below react version 18
// ReactDOM.render(<App/>);

//challenge1
