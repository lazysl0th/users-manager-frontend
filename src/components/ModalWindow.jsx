import { Modal, Button } from "react-bootstrap";

export default function ModalWindow({ show, onClose, title, message }) {

  return (
      <Modal
        size="sm"
        show={show}
        centered
        onHide={onClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
  );
}

