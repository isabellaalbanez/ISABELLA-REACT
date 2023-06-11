import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function EditUser({
  user,
  handleClose,
  atualizaUsuario,
  pegaUsuarios,
}) {
  const [editedUser, setEditedUser] = useState(user);
  const auxiliadoraAtualizaUsuario = async () => {
    try {
      await atualizaUsuario(editedUser);
      handleClose();
      pegaUsuarios();
    } catch (erros) {
      console.log(erros);
    }
  };
  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            cancelar
          </Button>
          <Button variant="primary" onClick={auxiliadoraAtualizaUsuario}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}