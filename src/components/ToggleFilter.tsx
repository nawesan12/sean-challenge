import { Form } from "react-bootstrap";
import { Book, Query } from "../types";
import { useState } from "react";

type ToggleFilterProps = {
  setResult: React.Dispatch<React.SetStateAction<Query>>;
};

export default function ToggleFilter({ setResult }: ToggleFilterProps) {
  const [previousResult, setPreviousResult] = useState({} as Query);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setResult((prevResult) => {
        setPreviousResult(prevResult);

        return {
          ...prevResult,
          docs: prevResult.docs.toSorted(
            (a: Book, b: Book) => a.first_publish_year - b.first_publish_year
          ),
        };
      });
    } else {
      setResult(previousResult);
    }
  };

  return (
    <Form.Check
      type="switch"
      id="custom-switch"
      label="Sort by Year"
      onChange={handleToggleChange}
    />
  );
}
