import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button, SkeletonCard } from "../components";
import useRecipes from "../hooks/useRecipes";
import {
  useFetchCuisines,
  useFetchDiets,
  useFetchDifficulties,
} from "../hooks/useRecipes";

// RecipeList component: displays a list of recipes with filters and pagination
const RecipeList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [diet, setDiet] = useState("");
  const limit = 12;
  const { data, error, isLoading, refetch } = useRecipes(
    page,
    limit,
    query,
    cuisine,
    difficulty,
    diet
  );
  const { data: cuisines } = useFetchCuisines();
  const { data: diets } = useFetchDiets();
  const { data: difficulties } = useFetchDifficulties();
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const navigate = useNavigate();

  // Refetch recipes when any of the filters or page changes
  useEffect(() => {
    refetch();
  }, [page, query, cuisine, difficulty, diet, refetch]);

  // Toggle the expansion of a recipe's details
  const handleReadMore = (recipeId: string) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };
  
  // Handle the search action
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <div className="flex space-x-4 mb-4">
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="border rounded py-2 px-4"
          >
            <option value="">All Cuisines</option>
            {cuisines?.map((cuisine: any) => (
              <option key={cuisine.id} value={cuisine.id}>
                {cuisine.name}
              </option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border rounded py-2 px-4"
          >
            <option value="">All Difficulties</option>
            {difficulties?.map((difficulty: any) => (
              <option key={difficulty.id} value={difficulty.id}>
                {difficulty.name}
              </option>
            ))}
          </select>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="border rounded py-2 px-4"
          >
            <option value="">All Diets</option>
            {diets?.map((diet: any) => (
              <option key={diet.id} value={diet.id}>
                {diet.name}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            Error loading recipes
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((recipe: any) => (
              <div
                key={recipe.id}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              >
                {recipe.image ? (
                  <img
                    src={`http://localhost:8080${recipe.image}`}
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h2
                    className="text-xl font-bold mb-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/recipes/${recipe.id}`);
                    }}
                  >
                    {recipe.name}
                  </h2>
                  <p className="text-gray-700 mb-4">Ingredients:</p>
                  <ul className="list-disc pl-5 mb-4">
                    {recipe.ingredients.map(
                      (ingredient: string, index: number) => (
                        <li key={index} className="text-gray-700">
                          {ingredient}
                        </li>
                      )
                    )}
                  </ul>
                  <p className="text-gray-700 mb-4">
                    {expandedRecipe === recipe.id
                      ? recipe.instructions
                      : `${recipe.instructions.substring(0, 100)}...`}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadMore(recipe.id);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    {expandedRecipe === recipe.id ? "Read less" : "Read more"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center py-4">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-300 text-gray-700"
          >
            Previous
          </Button>
          <span className="text-gray-700">Page {page}</span>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={data?.length < limit}
            className="bg-gray-300 text-gray-700"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
