import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Category from "./components/Category";
import logo from "../src/images/deliveroo-1.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLodaing] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jules-deliveroo-backend-v2.herokuapp.com/"
      );
      setData(response.data);
      setIsLodaing(false);
    };
    fetchData();
  }, []);

  let total = 0;

  const addToCart = (meal) => {
    const newCart = [...cart];

    const mealExists = newCart.find((elem) => elem.id === meal.id);

    if (mealExists) {
      mealExists.quantity++;
    } else {
      const newMeal = { ...meal, quantity: 1 };
      newCart.push(newMeal);
    }

    setCart(newCart);
  };

  const removeFromCart = (meal) => {
    const newCart = [...cart];
    const mealInTab = newCart.find((elem) => elem.id === meal.id);
    if (mealInTab.quantity === 1) {
      const index = newCart.indexOf(mealInTab);
      newCart.splice(index, 1);
    } else {
      mealInTab.quantity--;
    }

    setCart(newCart);
  };

  return isLoading ? (
    <p> Loading... </p>
  ) : (
    <div className="app">
      <div className="header">
        <div className="header-container">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="hero">
        <div className="container hero-container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>

          <img src={data.restaurant.picture} alt="restaurant-meal" />
        </div>
      </div>

      <main className="container">
        <div className="main-left">
          {data.categories.map((category, index) => {
            return (
              category.meals.length > 0 && (
                <Category
                  category={category}
                  key={index}
                  addToCart={addToCart}
                />
              )
            );
          })}
        </div>
        <div className="main-right">
          {cart.map((meal, index) => {
            total += meal.quantity * meal.price;
            return (
              <div key={meal.id}>
                <button
                  onClick={() => {
                    removeFromCart(meal);
                  }}
                >
                  -
                </button>
                <span>{meal.quantity}</span>
                <button
                  onClick={() => {
                    addToCart(meal);
                  }}
                >
                  +
                </button>
                <span>{meal.title}</span>
                <span>{(meal.price * meal.quantity).toFixed(2)} €</span>
              </div>
            );
          })}
          <p>Total : {total.toFixed(2)}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
