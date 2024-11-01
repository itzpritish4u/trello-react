import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function getCheckitems(id) {
    const response = await axios.get(
      `https://api.trello.com/1/checklists/${id}/checkItems?key=${apiKey}&token=${apiToken}`
    );
    return response.data;
  
}
