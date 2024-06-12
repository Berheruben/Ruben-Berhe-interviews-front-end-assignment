import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import queryClient from "./api/query";
import { QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
