import axios from "axios";
import { localhost } from "../../constant/index";
import globalState from "../../effector/src/globalState";

export const getRecipesApi = async (accessToken) => {
  try {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const res = await axios.get(`http://${localhost}:5000/api/recipe/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getIngredientsApi = async (accessToken) => {
  console.log(accessToken);

  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    const res = await axios.get(`http://${localhost}:5000/api/ingredient/`);
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
    const res = await axios.post(`http://${localhost}:5000/api/recipe/create`, {
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
    const res = await axios.post(`http://${localhost}:5000/api/ingredient/`, {
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
