import React, { useState } from "react";

// import ReactAsyncSelect from 'react-select/async'

import styles from "./Search.module.css";

interface IProps {
  inputSearchList(searchVal: string): any;
  clear: () => void;
}
const InputSelect: React.FC<IProps> = ({ inputSearchList, clear }) => {
  const [inputValue, setInputValue] = useState("");

  const searchBox = async (evt) => {
    evt.preventDefault();
    const val = typeof evt === "string" ? evt : evt.target.value;
    setInputValue(val);
    // check there are 3 characters before search
    if (val.length >= 3) {
      inputSearchList(val);
      console.log(evt);
      // check there is a result
    } else {
      clear();
    }
  };

  return (
    <div>
      <label aria-label="Search">Search:</label>
      <input
        type="text"
        className={styles.search}
        name="search"
        id="search"
        placeholder="filter results..."
        value={inputValue}
        onChange={searchBox}
      />
    </div>
  );
};
export default InputSelect;
