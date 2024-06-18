import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
   
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-8">
        <div className="md:w-1/2">
          <img
            src="/images/recipebook.webp"
            alt="RecipeBook"
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:ml-6 flex items-center justify-center flex-col">
          <img
            src="/images/recipelogo.webp"
            alt="RecipeBook Logo"
            className="mx-auto md:mx-0 h-20 w-20"
          />
          <h1 className="text-4xl font-bold mt-4">RecipeBook</h1>
          <p className="text-lg text-gray-700 mt-2">Discover Recipes</p>
          <Button
            onClick={() => navigate("/recipes")}
            className="bg-red-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-red-600 transition duration-200"
          >
            Explore
          </Button>
        </div>
      </div>

  );
};

export default HomePage;
