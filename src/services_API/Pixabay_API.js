import axios from 'axios';
const API_KEY = '31405972-7c23c7be60e1289f27e0f1942';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export default async function fetchAPI(value, page) {
  const { data } = await axios(
    `?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=15`
  );
  return data;
}
