import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_API_KEY;
const apiToken = import.meta.env.VITE_TRELLO_API_TOKEN;

export async function createBoard(boardName) {
    const response = await axios.post(`https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}` );
    return response.data;
}
