import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">RecipeBook</h1>
      <button
        onClick={() => navigate("/add")}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Add Recipe
      </button>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="border rounded py-2 px-4"
          placeholder="Search for recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
