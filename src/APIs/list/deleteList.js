import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function archiveList(listId) {
    const response = await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?value=true&key=${apiKey}&token=${apiToken}`
    );

    return response.data;
  
}
