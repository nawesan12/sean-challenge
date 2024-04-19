import { useState } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import ToggleFilter from "./components/ToggleFilter";
import { Query } from "./types";

function App() {
  const [result, setResult] = useState({} as Query);

  return (
    <>
      <SearchInput setResult={setResult} />
      <ToggleFilter setResult={setResult} />
      <SearchResults result={result} />
    </>
  );
}

export default App;
