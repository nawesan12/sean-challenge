import { Form, InputGroup, Spinner } from "react-bootstrap";
import { Query } from "../types";
import { useState, useEffect } from "react";

type SearchInputProps = {
  setResult: React.Dispatch<React.SetStateAction<Query>>;
};

export default function SearchInput({ setResult }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== "") {
        fetchResults();
      }
    }, 500); // Adjust debounce time as needed

    return () => clearTimeout(timer);
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setQuery(value);
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
        {loading && (
          <InputGroup.Text>
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </InputGroup.Text>
        )}
      </InputGroup>
    </>
  );
}
