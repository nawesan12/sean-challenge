import { Form, InputGroup } from "react-bootstrap";
import { Query } from "../types";
import { useState } from "react";

type SearchInputProps = {
  setResult: React.Dispatch<React.SetStateAction<Query>>;
};

export default function SearchInput({ setResult }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const fetchResults = async () => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value: string) => {
    setQuery(value);
    fetchResults();
  };

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#333"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search book"
          value={query}
          className="search-input"
          onChange={(e) => handleChange(e.target.value)}
        />
      </InputGroup>
    </>
  );
}
