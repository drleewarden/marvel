import md5 from 'js-md5';

export const makeUrl = () => {
    const PUBLIC_KEY = 'a4e7bbfa422fc0992aabb7e7db6c67c7'//'c853e56911bdee9ba6b85003847f0fe0'; // your public key
    const PRIVATE_KEY = '486ccd83837f6c4487cbc93063d4390d5f3a69e3'//'29e28e337c0e480db0ad5e263de539e247d4ebd7'; // your private key
    const ts = Number(new Date());
    const hash = md5.create();
    hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
    return url
}
export const fetcher = async (url:string) => {
    // Get yours APIs key at https://developer.marvel.com
    const response = await fetch(url);
    const data = await response.json()
    return data;
}
