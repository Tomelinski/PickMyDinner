import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./info.css";

import { getSpoonRecipeById } from "../../api/app";

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const [recipeInfo, setRecipeInfo] = useState("");
  const [dataFlag, setDataFlag] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        await getSpoonRecipeById(recipeId).then((data) => {
          setRecipeInfo(data);
          setDataFlag(true);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  return (
    <div>
      <div className="josefin">
        {console.log(recipeInfo)}
        <h1>{recipeInfo.title}</h1>
      </div>
      <div className="formSpace form-bg">
        <div className="josefin">
          <h4>Ingredients</h4>
        </div>
        <div className="row ingredientSize lora">
          {dataFlag &&
            recipeInfo.extendedIngredients.map((info) => (
              <div className="ingredientValue" key={info.id}>
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${info.image}`}
                  className="imgStyle r-2"
                  alt={info.name}
                />
                <div className="textStyle">
                  {info.amount + " " + info.unit + " " + info.name}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="formSpace form-bg">
        <div>
          <h4 className="josefin">Instructions</h4>
        </div>
        <div className="row stepSize lora">
          {dataFlag &&
            recipeInfo.analyzedInstructions[0].steps.map((info) => (
              <div className="stepValue" key={info.id}>
                <div>{"Step: " + info.number}</div>
                <div className="ml-4">{info.step}</div>
              </div>
            ))}
        </div>
      </div>
      <div className=" formSpace form-bg">
        <div className="instructionSize">
          <div>
            <h4 className="lora">Summary</h4>
          </div>

          <div
            className="instructionValue"
            dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
