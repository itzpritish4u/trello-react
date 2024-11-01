import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function deleteCheckitems(id, idCheckItem) {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${id}/checkItems/${idCheckItem}?key=${apiKey}&token=${apiToken}`
    );
    return response.data;
  
}
