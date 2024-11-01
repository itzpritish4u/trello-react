import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function deleteChecklist(id) {
  const response = await axios.delete(
    `https://api.trello.com/1/checklists/${id}?key=${apiKey}&token=${apiToken}`
  );

  return response.data;
}