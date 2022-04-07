import React, { useState } from "react";

// import Form from "react-bootstrap/Form";
import RecipeForm from "./recipe/recipeForm";
// import RestaurantForm from "./restaurant/restaurantForm";

const Home = () => {
  const [formState, setFormState] = useState(true);

  const switchHandler = () => {
    setFormState(!formState);
  };
  return (
    <div>
      {/* <div className="d-flex">
        <span className="mr-2">Recipe </span>
        <Form.Check type="switch" id="formSwitch" onChange={switchHandler} />
        <span>Restaurant </span>
      </div>
      {formState && <RecipeForm />}
      {!formState && <RestaurantForm />} */}
      <RecipeForm />
    </div>
  );
};

export default Home;
