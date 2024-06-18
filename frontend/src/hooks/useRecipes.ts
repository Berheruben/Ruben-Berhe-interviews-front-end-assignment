import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCuisines = async () => {
    const { data } = await axios.get('http://localhost:8080/cuisines');
    return data;
};

const fetchDiets = async () => {
    const { data } = await axios.get('http://localhost:8080/diets');
    return data;
};

const fetchDifficulties = async () => {
    const { data } = await axios.get('http://localhost:8080/difficulties');
    return data;
};

export const useFetchCuisines = () => {
    return useQuery({
        queryKey: ['cuisines'],
        queryFn: fetchCuisines
        
    });
};

export const useFetchDiets = () => {
    return useQuery({
        queryKey: ['diets'],
        queryFn: fetchDiets
    });
};

export const useFetchDifficulties = () => {
    return useQuery({
        queryKey: ['difficulties'],
        queryFn: fetchDifficulties
    });
};
const fetchRecipes = async (page: number, limit: number, query: string, cuisine: string, difficulty: string, diet: string) => {
    const params: any = { _page: page, _limit: limit };
    if (query) params.q = query;
    if (cuisine) params.cuisineId = cuisine;
    if (difficulty) params.difficultyId = difficulty;
    if (diet) params.dietId = diet;
    const { data } = await axios.get(`http://localhost:8080/recipes`, { params });
    return data;
};

const useRecipes = (page: number, limit: number, query: string, cuisine: string, difficulty: string, diet: string) => {
    return useQuery({
        queryKey: ['recipes', page, limit, query, cuisine, difficulty, diet],
        queryFn: () => fetchRecipes(page, limit, query, cuisine, difficulty, diet),
    });
};

export default useRecipes;
