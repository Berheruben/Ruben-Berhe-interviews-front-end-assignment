import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactStars from "react-stars";
import Button from "../components/Button";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/${id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchRecipe();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) {
      toast.error("Please give a rating of at least 1 star.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/recipes/${id}/comments`,
        {
          comment: newComment,
          rating,
          date: new Date().toISOString(),
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
      setRating(0);
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Error adding comment.");
      console.error("Error adding comment:", error);
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      {recipe.image && (
        <img
          src={`http://localhost:8080${recipe.image}`}
          alt={recipe.name}
          className="w-full h-[30rem] object-cover mb-4 rounded-lg"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index} className="text-gray-700">
            {ingredient}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-2">Instructions</h2>
      <p className="text-gray-700 mb-4 whitespace-pre-line">
        {recipe.instructions}
      </p>
      <h2 className="text-2xl font-bold mb-2">User Reviews</h2>
      <ul className="mb-4 space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="font-bold mb-1">{comment.comment}</p>
            <ReactStars
              count={5}
              value={comment.rating}
              size={24}
              color2={"#ffd700"}
              edit={false}
            />
            <p className="text-gray-400 text-sm">
              {new Date(comment.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="space-y-4 mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Leave your review here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <ReactStars
          count={5}
          value={rating}
          onChange={(newRating) => setRating(newRating)}
          size={24}
          color2={"#ffd700"}
          half={true}
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default RecipeDetails;
