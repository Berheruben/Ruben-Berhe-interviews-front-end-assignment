import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import queryClient from "./api/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecipeList, AddRecipe, RecipeDetails, HomePage } from "./pages";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
