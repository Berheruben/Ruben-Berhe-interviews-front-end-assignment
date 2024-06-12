import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRecipes = async (page: number, limit: number) => {
    const { data } = await axios.get(`http://localhost:8080/recipes`, {
        params: { _page: page, _limit: limit },
    });
    return data;
};

const useRecipes = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['recipes', page, limit],
        queryFn: () => fetchRecipes(page, limit),
    });
};

export default useRecipes;
