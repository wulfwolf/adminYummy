import axios from "axios";

import globalState from "../../effector/src/globalState";
import { API_ENDPOINT } from "../../constant";

export const getRecipesApi = async (accessToken) => {
  try {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.get(`${API_ENDPOINT}/recipe/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getIngredientsApi = async (accessToken) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const res = await axios.get(`${API_ENDPOINT}/ingredient/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const createRecipesApi = async ({ accessToken, recipe }) => {
  console.log(recipe);

  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const res = await axios.post(`${API_ENDPOINT}/recipe/create`, {
      recipeName: recipe.recipeName,
      desc: recipe.desc,
      preparations: recipe.preparations,
      img: recipe.img,
      calories: recipe.calories,
      instruction: recipe.instruction,
      meal: recipe.meal,
      ingredients: recipe.ingredients,
    });
    if (res.status === 200) {
      alert("Reciped Added successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};
export const createIngredientsApi = async ({ accessToken, ingredient }) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const res = await axios.post(`${API_ENDPOINT}/api/ingredient/`, {
      foodName: ingredient.foodName,
      img: ingredient.img,
      ScanCode: ingredient.ScanCode,
      unit: ingredient.unit,
    });
    if (res.status === 200) {
      alert("Reciped Added successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};
