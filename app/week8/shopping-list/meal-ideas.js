import { useState, useEffect } from "react";

const fetchMealIdeas = async (ingredient) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
};

const fetchIngredients = async (mealID) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    const data = await response.json();
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = data.meals[0][`strIngredient${i}`];
      const measure = data.meals[0][`strMeasure${i}`];
      if (ingredient && measure) {
        ingredientsList.push({ ingredient, measure });
      }
    }
    return ingredientsList;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

export default function MealIdeas({ ingredient, updateNumberOfMeals }) {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [fetchedMeal, setFetchedMeal] = useState([]);

  useEffect(() => {
    const fetchMealIdeasData = async () => {
      if (!ingredient) {
        setMeals([]);
        updateNumberOfMeals(0);
        setFetchedMeal([]);
        return;
      }
      try {
        const mealIdeas = await fetchMealIdeas(ingredient);

        if (!mealIdeas || mealIdeas.length === 0) {
          setMeals([]);
          updateNumberOfMeals(0);
          setFetchedMeal([]);
          return;
        }

        setMeals(mealIdeas);
        updateNumberOfMeals(mealIdeas.length);
      } catch (error) {
        console.error("Error fetching meal ideas:", error);
        setMeals([]);
        setFetchedMeal([]);
        updateNumberOfMeals(0);
      }
    };

    fetchMealIdeasData();
  }, [ingredient, updateNumberOfMeals]);

  const fetchIngredientsData = async (mealID) => {
    if (fetchedMeal.includes(mealID)) {
      return;
    }

    try {
      const ingredientsList = await fetchIngredients(mealID);
      setIngredients((prevIngredients) => [...prevIngredients, ...ingredientsList]);
      setFetchedMeal([mealID]);
    } catch (error) {
      console.error("Error fetching meal ideas:", error);
      setIngredients([]);
    }
  };

  return (
    <div className="card bg-blue-100 rounded-lg shadow-xl p-4 max-w-lg mx-2 mb-2">
      <div className="card-body">
        <p className="card-title text-2xl">Meal Ideas</p>
        {ingredient ? (
          <>
            {meals.length > 0 ? (
              <>
                <p>
                  Here are some meal ideas using{" "}
                  <span className="font-bold text-primary">{ingredient}</span>:
                </p>
                <ul>
                  {meals.map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="collapse collapse-arrow bg-base-100 hover:btn-active mb-2"
                      onClick={() => fetchIngredientsData(meal.idMeal)}
                    >
                      <input type="radio" name="my-accordion" />
                      <div className="collapse-title text-xl font-medium">
                        {meal.strMeal}
                      </div>
                      <div className="collapse-content">
                        <p className="font-bold mb-2">Ingredients needed:</p>
                        <ul>
                          {ingredients.map((ingredient, index) => (
                            <li key={index}>
                              {ingredient.ingredient} {ingredient.measure}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </ul>
              </>
            ) : (
              <p>
                No meals found using{" "}
                <span className="font-bold text-primary">{ingredient}</span>.
              </p>
            )}
          </>
        ) : (
          <p>Select an item to see meal ideas</p>
        )}
      </div>
    </div>
  );
}