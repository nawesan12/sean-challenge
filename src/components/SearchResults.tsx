import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Query } from "../types";
import ISBNModal from "./ISBNModal";
import { useState } from "react";

export default function SearchResults({ result }: { result: Query }) {
  const [selectedISBN, setSelectedISBN] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleISBNClick = (isbn: string | string[] | undefined) => {
    setSelectedISBN(isbn as string);
    setShowModal(true);
  };

  return (
    <>
      {result.docs?.length > 0 ? (
        <Container fluid className="px-0">
          <Row xs={1} md={3} className="mx-0">
            {result.docs.map((book) => (
              <Col key={book.edition_key[0]} className="mb-3 px-2">
                <Card className="h-100 custom-card shadow">
                  <Card.Body>
                    <Card.Title className="mb-2 font-weight-bold">
                      {book.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      {book.author_name}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Publish year:</strong> {book.first_publish_year}
                      <br />
                      <strong>Number of pages:</strong>{" "}
                      {book.number_of_pages_median}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item
                      className="overflow-auto"
                      onClick={() => handleISBNClick(book.isbn)}
                      style={{ cursor: "pointer" }}
                    >
                      <strong>ISBN:</strong> Click to see
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <h2 className="text-center mt-4">No books found!</h2>
      )}
      <ISBNModal
        isbn={selectedISBN}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
      ;
    </>
  );
}
