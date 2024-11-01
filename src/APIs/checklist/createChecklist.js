import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function createChecklist(checklistName, id) {
  const response = await axios.post(
    `https://api.trello.com/1/checklists?idCard=${id}&name=${checklistName}&key=${apiKey}&token=${apiToken}`,
    {
      method: "POST",
    }
  );

  return response.data;
}
