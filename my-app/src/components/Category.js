import React from "react";

const Category = ({ category, addToCart }) => {
  return (
    <section>
      <h2>{category.name}</h2>
      <div className="meals-container">
        {category.meals.map((meal, num) => {
          return (
            <article
              key={meal.id}
              onClick={() => {
                addToCart(meal);
              }}
            >
              <h3>{meal.title}</h3>
              <p>{meal.price} €</p>
              {meal.popular && <p className="popular">popular</p>}
              <img src={meal.picture} alt="meal" />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
