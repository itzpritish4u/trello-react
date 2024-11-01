import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function getChecklists(cardId) {
  const response = await axios.get(
    `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`
  );
  return response.data;
}
