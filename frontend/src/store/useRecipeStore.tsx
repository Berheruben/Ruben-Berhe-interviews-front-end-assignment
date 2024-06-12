import {create} from "zustand";

interface RecipeState {
  recipes: any[];
  setRecipes: (recipes: any[]) => void;
}

const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
