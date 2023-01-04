import { Button, Container, Modal } from 'react-bootstrap'

const AddModal = ({
  children, onClose, onHide, onSubmit, show, head
}) => {

  return (
    <Modal
      size="lg"
      centered={true}
      show={show}
      onHide={onHide}>
      <Modal.Header closeButton>
        {head}
      </Modal.Header>

      <Modal.Body className="px-3">
        <Container fluid className="py-2">
          {children}
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default AddModal;
