import axios from 'axios'

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function getCards(listId) {
    const response = await axios.get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`
    );

    return response.data;

}
