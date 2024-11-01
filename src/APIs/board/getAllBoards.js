import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function getAllBoards() {
  const response = await axios.get(
    `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`
  );

  return response.data;
}
