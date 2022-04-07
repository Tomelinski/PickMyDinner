import React, { useState } from "react";
import Post from "../../components/common/post";
import { getSpoonRecipes } from "../../api/app";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import RangeSlider from "react-bootstrap-range-slider";

const RestaurantForm = () => {
  const [protein, setProtein] = React.useState(-1);
  const [minCalories, setMinCalories] = React.useState(-1);
  const [maxCalories, setMaxCalories] = React.useState(2000);
  const [sugar, setSugar] = React.useState(-1);
  const [sodium, setSodium] = React.useState(-1);
  const [recipes, setRecipes] = React.useState(null);

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();

    try {
      setRecipes(
        await getSpoonRecipes(protein, minCalories, maxCalories, sugar, sodium)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="content-justify-center">
      <div className="mt-3">
        <h1>Find a restaurant</h1>
        <Form className="row" onSubmit={handleRestaurantSubmit}>
          <div className="col-6">
            <Form.Group>
              <Form.Label>Calories</Form.Label>
              <div className="d-flex">
                <div className="col-4">
                  <Form.Control
                    onChange={(e) => setMaxCalories(e.target.value)}
                    value={minCalories == -1 ? "Any" : minCalories}
                  />
                </div>
                <div className="col-7">
                  <RangeSlider
                    value={minCalories}
                    onChange={(e) => setMinCalories(e.target.value)}
                    min={-1}
                    max={2000}
                    tooltip="off"
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Protein</Form.Label>
              <div className="d-flex">
                <div className="col-4">
                  <Form.Control
                    onChange={(e) => setProtein(e.target.value)}
                    value={protein == -1 ? "Any" : protein + "g"}
                  />
                </div>
                <div className="col-7">
                  <RangeSlider
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    min={-1}
                    max={100}
                    tooltip="off"
                  />
                </div>
              </div>
            </Form.Group>
          </div>

          <div className="col-6">
            <Form.Group>
              <Form.Label>Sugar</Form.Label>
              <div className="d-flex">
                <div className="col-4">
                  <Form.Control
                    onChange={(e) => setSugar(e.target.value)}
                    value={sugar == -1 ? "Any" : sugar + "g"}
                  />
                </div>
                <div className="col-7">
                  <RangeSlider
                    value={sugar}
                    onChange={(e) => setSugar(e.target.value)}
                    min={-1}
                    max={100}
                    tooltip="off"
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Sodium</Form.Label>
              <div className="d-flex">
                <div className="col-4">
                  <Form.Control
                    onChange={(e) => setSodium(e.target.value)}
                    value={sodium == -1 ? "Any" : sodium + "g"}
                  />
                </div>
                <div className="col-7">
                  <RangeSlider
                    value={sodium}
                    onChange={(e) => setSodium(e.target.value)}
                    min={-1}
                    max={100}
                    tooltip="off"
                  />
                </div>
              </div>
            </Form.Group>
          </div>

          <Form.Group className="col-12 d-flex justify-content-between">
            <div>
              <Button variant="primary" type="submit">
                Find Restaurant
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
      <div className="row">
        {recipes && (
          <div className="col-lg-12 card-group d-flex justify-content-between">
            {recipes.data.map((recipe) => (
              <div key={recipe.id} className="col-4">
                <Post media={recipe.image} title={recipe.title} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantForm;
