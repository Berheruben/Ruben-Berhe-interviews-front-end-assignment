import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetches a list of cuisines from the API
const fetchCuisines = async () => {
    const { data } = await axios.get("http://localhost:8080/cuisines");
    return data;
};

// Fetches a list of diets from the API
const fetchDiets = async () => {
    const { data } = await axios.get("http://localhost:8080/diets");
    return data;
};

// Fetches a list of difficulties from the API
const fetchDifficulties = async () => {
    const { data } = await axios.get("http://localhost:8080/difficulties");
    return data;
};

// Custom hook to fetch cuisines using react-query
export const useFetchCuisines = () => {
    return useQuery({
        queryKey: ["cuisines"],
        queryFn: fetchCuisines,
    });
};

// Custom hook to fetch diets using react-query
export const useFetchDiets = () => {
    return useQuery({
        queryKey: ["diets"],
        queryFn: fetchDiets,
    });
};

// Custom hook to fetch difficulties using react-query
export const useFetchDifficulties = () => {
    return useQuery({
        queryKey: ["difficulties"],
        queryFn: fetchDifficulties,
    });
};

// Fetches a list of recipes from the API based on filters and pagination
const fetchRecipes = async (
    page: number,
    limit: number,
    query: string,
    cuisine: string,
    difficulty: string,
    diet: string
) => {
    const params: any = { _page: page, _limit: limit };
    if (query) params.q = query;
    if (cuisine) params.cuisineId = cuisine;
    if (difficulty) params.difficultyId = difficulty;
    if (diet) params.dietId = diet;
    const { data } = await axios.get(`http://localhost:8080/recipes`, { params });
    return data;
};

// Custom hook to fetch recipes using react-query
const useRecipes = (
    page: number,
    limit: number,
    query: string,
    cuisine: string,
    difficulty: string,
    diet: string
) => {
    return useQuery({
        queryKey: ["recipes", page, limit, query, cuisine, difficulty, diet],
        queryFn: () =>
            fetchRecipes(page, limit, query, cuisine, difficulty, diet),
    });
};

export default useRecipes;
