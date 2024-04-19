import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ISBNModalProps {
  isbn: string;
  show: boolean;
  onClose: () => void;
}

const ISBNModal: React.FC<ISBNModalProps> = ({ isbn, show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>ISBN Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ overflowWrap: "break-word" }}>{isbn}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ISBNModal;
