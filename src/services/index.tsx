import md5 from "js-md5";

export const makeUrl = () => {
  const PUBLIC_KEY = "a4e7bbfa422fc0992aabb7e7db6c67c7";
  const PRIVATE_KEY = process.env.MARVEL;
  const ts = Number(new Date());
  const hash = md5.create();
  hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=100&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
  return url;
};
export const fetcher = async (url: string) => {
  // Get yours APIs key at https://developer.marvel.com
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
