import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { makeUrl, fetcher } from "../src/services";
import { useState } from "react";
import InputSelect from "../src/components/search";

interface ICharacter {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
const Home: NextPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCharaters, setAllCharaters] = useState();

  const filterArr = (arr: ICharacter[], text: string) => {
    return arr.filter((item) => item.name.toLowerCase().includes(text));
  };
  const searchResults = (inputText: string) => {
    const char = filterArr(characters, inputText);
    setCharacters(char);
  };
  const clear = () => {
    setCharacters(allCharaters);
  };
  const init = async (url: string) => {
    const data = await fetcher(url);
    const removeNoImgsList = data.data.results.filter(
      (character: ICharacter) =>
        character?.thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    );
    setAllCharaters(removeNoImgsList);
    setCharacters(removeNoImgsList);
    return data;
  };
  if (loading) {
    const url = makeUrl();
    init(url);
    setLoading(false);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to MARVEL</h1>
        <InputSelect inputSearchList={searchResults} clear={clear} />
        {loading && <h2>loading...</h2>}
        <div className={styles.grid}>
          {characters &&
            characters.map((char: ICharacter, index) => {
              return (
                <div key={index} className={styles.card}>
                  <h3 className={styles.cardTitle}>{char?.name}</h3>
                  <div className={styles.imgWrapper}>
                    <img
                      className={styles.image}
                      src={`${char?.thumbnail.path}.${char?.thumbnail.extension}`}
                    />
                  </div>
                  <br />
                  <div className={styles.decWrapper}>
                    <i className={styles.cardDescription}>
                      {char?.description}
                    </i>
                  </div>
                </div>
              );
            })}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>marvel comics</p>
      </footer>
    </div>
  );
};

export default Home;
