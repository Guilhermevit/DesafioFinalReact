import axios from 'axios';

export async function httpServiceGet(url) {
  const { data } = await axios.get(url);
  return data;
}
