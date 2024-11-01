import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function createCheckitems(checkListItemName, id) {
    const response = await axios.post(
      `https://api.trello.com/1/checklists/${id}/checkItems?name=${checkListItemName}&key=${apiKey}&token=${apiToken}`
    );

    return response.data;
  
}
