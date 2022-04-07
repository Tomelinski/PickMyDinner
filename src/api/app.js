import axios from "axios";
import {
  API_KEY,
  API_SEARCH,
  API_SEARCH_BY_ID,
  NUM_OF_RESULTS,
  SORT,
  ADD_RECIPE_INFO,
} from "./api-config.js";
import { domain } from "./api-config.js";

export const getSpoonRecipes = async (recipeData) => {
  let { type, diet, nutritionValues, intolerances } = recipeData;

  let param = API_SEARCH + "?apiKey=" + API_KEY;
  // if (minCalories >= 0) param += "&minCalories=" + minCalories;
  if (type !== "any") param += "&type=" + type;
  if (diet !== "any") param += "&diet=" + diet;

  if (nutritionValues.calories >= 0)
    param += "&maxCalories=" + nutritionValues.calories;
  if (nutritionValues.protein >= 0)
    param += "&minProtein=" + nutritionValues.protein;
  if (nutritionValues.fat >= 0) param += "&maxSugar=" + nutritionValues.fat;
  if (nutritionValues.sugar >= 0) param += "&maxSugar=" + nutritionValues.sugar;
  if (nutritionValues.sodium >= 0)
    param += "&maxSodium=" + nutritionValues.sodium;

  if (intolerances.length > 0)
    param += "&intolerances=" + intolerances.join(",");

  param += "&addRecipeInformation=" + ADD_RECIPE_INFO;
  param += "&number=" + NUM_OF_RESULTS;
  param += "&sort=" + SORT;
  // console.log(param);
  return (
    axios
      .get(param)
      // .get(
      //   "https://api.spoonacular.com/recipes/findByNutrients?apiKey=cecd6cf2118f4971bcec167b01f01f8e"
      // )
      .then((response) => {
        // console.log("loginData: " + response);
        return response;
      })
      .catch((err) => {
        console.log("An Error has occured while retrieve data");
      })
  );
};

export const getSpoonRecipeById = async (recipeId) => {
  let param = API_SEARCH_BY_ID + recipeId + "/information?apiKey=" + API_KEY;
  // console.log("API REQUEST: ", param);
  return axios
    .get(param)

    .then((response) => {
      // console.log("ByID Data: ", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log("An Error has occured while retrieve data");
    });
};

export const handleLikeRequest = async (recipeId) => {
  let param = domain + "/user/like/" + recipeId;
  return axios
    .get(param, {
      withCredentials: true,
    })
    .then((response) => {
      // console.log("Liked?: : " + response);
      return response;
    })
    .catch((err) => {
      console.log("An Error has occured while attempting to like");
    });
};

export const getFavourites = async () => {
  let param = domain + "/user/favourites";
  return axios
    .get(param, {
      withCredentials: true,
    })
    .then((response) => {
      // console.log("res favs: " + response.data.favourites);
      return response.data.favourites;
    })
    .catch((err) => {
      console.log("An Error has occured while retrieve Likes");
    });
};
