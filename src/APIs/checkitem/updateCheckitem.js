import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function updateCheckitem(cardId, idCheckItem, state) {
  const response = await axios.put(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${idCheckItem}?&state=${state}&key=${apiKey}&token=${apiToken}`
  );

  return response.data;
}
