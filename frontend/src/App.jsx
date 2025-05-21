import "./App.css";
import { useState, useEffect } from "react";
import Cat from "./Cat";

function App() {
  const [inputValue, setInputValue] = useState(""); // user input for cat breed
  const [title, setTitle] = useState(""); // h1 data (HTTP GET, /cat)
  const [breed, setBreed] = useState(""); // 4-letter breed_id, this will be sent to server (HTTP GET, /cat/:input)
  const [info, setInfo] = useState([]); // array of fetched data (10 cats of certain breed)
  const [error, setError] = useState("");

  const api = "http://localhost:3003"; // backend (development server)

  useEffect(() => {
    async function fetchTitle() {
      try {
        const response = await fetch(`${api}/cat`);
        const res = await response.json();
        if (response.ok) {
          setTitle(res.message);
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
    fetchTitle();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) {
      setError("please specify the breed");
      setInfo([]);
      return;
    }

    try {
      //? let's fetch the data (10 cats of searched breed) via our backend
      const response = await fetch(`???????`);
      const res = await response.json();
      if (response.ok) {
        setInfo(res);
        setError("");
      } else {
        setError(res.error);
        setInfo([]);
      }
      setInputValue("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  const handleChange = (e) => {
    const fullInput = e.target.value;
    setInputValue(fullInput); // keep the full text for user display

    //* process breed logic
    // if there are more than two words typed in (e.g. british shorthair), combine the 1st letter from the 1st word and the 1st three letters from the 2nd word (bshor)
    // if it's just one word(e.g. persian), get the 1st 4 letters (pers)

    const words = fullInput
      .trim()
      .split(" ")
      .filter((w) => w.length > 0);

    if (words.length > 1) {
      setBreed(words[0][0].toLowerCase() + words[1].slice(0, 3).toLowerCase());
    } else if (words.length === 1) {
      setBreed(words[0].slice(0, 4).toLowerCase());
    } else {
      setBreed("");
    }
  };
  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={inputValue || ""}
          placeholder="enter cat breed"
        />
        <button>search</button>
      </form>
      {!!info.length &&
        info.map((catObj) => <Cat key={catObj.id} cat={catObj} />)}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default App;
