import React, { useState, useContext } from "react";
import Post from "../../components/common/post";
import { getSpoonRecipes, getFavourites } from "../../api/app";
import { AuthContext } from "../../context/authContext";
import "./recipeForm.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import ToggleButton from "react-bootstrap/ToggleButton";
import RangeSlider from "react-bootstrap-range-slider";

const RecipeForm = () => {
  const allIntolerances = [
    "dairy",
    "egg",
    "gluten",
    "grain",
    "peanut",
    "seafood",
    "sesame",
    "shellfish",
    "soy",
    "tree nut",
    "wheat",
  ];
  const allFoodTypes = {
    any: "any",
    breakfast: "breakfast",
    lunch: "fingerfood",
    dinner: "main course",
    sides: "side dish",
  };
  const allDiets = ["any", "gluten free", "vegetarian", "vegan"];

  const [type, setType] = React.useState("any");
  const [diet, setDiet] = React.useState("any");

  const [nutritionValues, setNutritionValues] = React.useState({
    calories: -1,
    protein: -1,
    fat: -1,
    sugar: -1,
    sodium: -1,
  });
  const [intolerances, setIntolerances] = React.useState([]);
  const [recipes, setRecipes] = React.useState(null);
  const [favourites, setFavourites] = useState([]);
  const [open, setOpen] = useState(true);

  const user = useContext(AuthContext);

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    let recipeData = {
      type,
      diet,
      nutritionValues,
      intolerances,
    };
    setOpen(false);
    try {
      setRecipes(await getSpoonRecipes(recipeData));
      if (user) {
        setFavourites(await getFavourites());
      } else {
        setFavourites([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNutrition = (nutrition, value) => {
    setNutritionValues({ ...nutritionValues, [nutrition]: value });
  };

  const handleIntolerances = (intolerance) => {
    if (intolerances.includes(intolerance)) {
      setIntolerances([...intolerances.filter((item) => item !== intolerance)]);
    } else {
      setIntolerances([...intolerances, intolerance]);
    }
  };

  const handleType = (foodType) => {
    setType(foodType);
  };

  const handleDiet = (dietType) => {
    setDiet(dietType);
  };

  return (
    <div className="content-justify-center">
      <div className="mt-3">
        <h4 className="lora d-flex">
          {open ? (
            ""
          ) : (
            <>
              don’t like any of your options?
              <button
                className="tryAgain orange ml-2"
                onClick={() => setOpen(true)}
              >
                try again
              </button>
            </>
          )}
        </h4>
        <Collapse in={open}>
          <Form onSubmit={handleRecipeSubmit}>
            <div className="formSpace row justify-content-between">
              <div className="form-bg optionFood">
                <div>
                  <h4>FOOD TYPE</h4>
                </div>
                <div className="checkboxContainer">
                  {Object.keys(allFoodTypes).map((foodType, key) => (
                    <ToggleButton
                      key={foodType}
                      id={`foodType-${key}`}
                      className="checkbox purple m-1 pt-0 pb-0"
                      type="checkbox"
                      variant="outline-primary"
                      value={allFoodTypes[foodType]}
                      checked={allFoodTypes[foodType] === type}
                      onChange={(e) => handleType(e.currentTarget.value)}
                    >
                      {foodType}
                    </ToggleButton>
                  ))}
                </div>
              </div>

              <div className="form-bg optionDiet">
                <div>
                  <h4>DIET RESTRICTIONS</h4>
                </div>
                {allDiets.map((dietType, key) => (
                  <ToggleButton
                    key={dietType}
                    id={`diet-${key}`}
                    className="checkbox green m-1 pt-0 pb-0"
                    type="checkbox"
                    variant="outline-success"
                    value={dietType}
                    checked={dietType === diet}
                    onChange={(e) => handleDiet(e.currentTarget.value)}
                  >
                    {dietType}
                  </ToggleButton>
                ))}
              </div>
            </div>

            <div className="formSpace form-bg row">
              <div>
                <h4>NUTRITION VALUES</h4>
              </div>
              <div className="row sliderSize">
                {Object.keys(nutritionValues).map((nutrition) => (
                  <div key={nutrition}>
                    <Form.Group>
                      <Form.Label>{nutrition}</Form.Label>
                      <div className="d-flex">
                        <div className="sliderValue">
                          <Form.Control
                            onChange={(e) =>
                              handleNutrition(nutrition, e.target.value)
                            }
                            value={
                              nutritionValues[nutrition] == -1
                                ? "any"
                                : nutritionValues[nutrition]
                            }
                          />
                        </div>
                        <div className="slider">
                          <RangeSlider
                            value={nutritionValues[nutrition]}
                            onChange={(e) =>
                              handleNutrition(nutrition, e.target.value)
                            }
                            min={-1}
                            max={2000}
                            tooltip="off"
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                ))}
              </div>
            </div>
            <div className="formSpace form-bg row">
              <div>
                <div>
                  <h4>INTOLERANCES</h4>
                </div>
                <div>
                  {allIntolerances.map((intolerance, key) => (
                    <ToggleButton
                      key={intolerance}
                      id={`toggle-check-${key}`}
                      className="checkbox teal m-1 pt-0 pb-0"
                      type="checkbox"
                      value={intolerance}
                      checked={intolerances.includes(intolerance)}
                      onChange={(e) =>
                        handleIntolerances(e.currentTarget.value)
                      }
                    >
                      {intolerance}
                    </ToggleButton>
                  ))}
                </div>
              </div>
            </div>
            <Form.Group className="col-12 d-flex justify-content-center">
              <div>
                <Button
                  className="josefin submitButton"
                  variant="warning"
                  type="submit"
                >
                  GIVE ME RECIPES!
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Collapse>
      </div>

      {recipes && (
        <div className="row cardSize">
          {recipes.data.results.map((recipe) => (
            <div key={recipe.id} className="col cardValue">
              <Post
                media={recipe.image}
                title={recipe.title}
                recipeInfo={recipe}
                user={user}
                favourites={favourites}
                setFavourites={setFavourites}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
