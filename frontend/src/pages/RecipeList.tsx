import React, { useState } from "react";
import useRecipes from "../hooks/useRecipes";

const RecipeList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, error, isLoading } = useRecipes(page, limit);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">Error loading recipes</div>
    );

  const handleReadMore = (recipeId: string) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((recipe: any) => (
          <div
            key={recipe.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={`http://localhost:8080/uploads/${recipe.image}`}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
              Ingredients:
              <ul className="list-disc pl-5 mb-4">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 mb-4">
                {expandedRecipe === recipe.id
                  ? recipe.instructions
                  : `${recipe.instructions.substring(0, 100)}...`}
              </p>
              <button
                onClick={() => handleReadMore(recipe.id)}
                className="text-blue-500 hover:underline"
              >
                {expandedRecipe === recipe.id ? "Read less" : "Read more"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className={`bg-gray-300 text-gray-700 py-2 px-4 rounded ${
            data?.length < limit ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={data?.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
