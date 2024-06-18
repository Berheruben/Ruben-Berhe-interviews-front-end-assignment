import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useFetchCuisines,
  useFetchDiets,
  useFetchDifficulties,
} from "../api/Recipes";
import { Button } from "../components";

// AddRecipe component: handles the form to add a new recipe
const AddRecipe: React.FC = () => {
  // State variables to manage form data
  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string>("");
  const [cuisineId, setCuisineId] = useState<string>("");
  const [dietId, setDietId] = useState<string>("");
  const [difficultyId, setDifficultyId] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  // Fetch data for dropdowns
  const { data: cuisines } = useFetchCuisines();
  const { data: diets } = useFetchDiets();
  const { data: difficulties } = useFetchDifficulties();

  // Handle ingredient field change
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  // Add new ingredient field
  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });
    formData.append("instructions", instructions);
    formData.append("cuisineId", cuisineId);
    formData.append("dietId", dietId);
    formData.append("difficultyId", difficultyId);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:8080/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Recipe created successfully!");
      navigate("/recipes");
    } catch (error) {
      toast.error("Error creating recipe.");
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Recipe Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Ingredients
          </label>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
          ))}
          <Button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={addIngredientField}
          >
            Add another ingredient
          </Button>
        </div>
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Instructions
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Cuisine Type
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cuisineId}
            onChange={(e) => setCuisineId(e.target.value)}
            required
          >
            <option value="">Select Cuisine</option>
            {cuisines?.map((cuisine: any) => (
              <option key={cuisine.id} value={cuisine.id}>
                {cuisine.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Dietary Preference
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dietId}
            onChange={(e) => setDietId(e.target.value)}
            required
          >
            <option value="">Select Diet</option>
            {diets?.map((diet: any) => (
              <option key={diet.id} value={diet.id}>
                {diet.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Difficulty Level
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={difficultyId}
            onChange={(e) => setDifficultyId(e.target.value)}
            required
          >
            <option value="">Select Difficulty</option>
            {difficulties?.map((difficulty: any) => (
              <option key={difficulty.id} value={difficulty.id}>
                {difficulty.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageChange}
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Add Recipe
        </Button>
      </form>
    </div>
  );
};

export default AddRecipe;
