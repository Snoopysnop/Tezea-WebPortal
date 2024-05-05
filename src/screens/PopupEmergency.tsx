import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Emergency } from '../api/Model';

interface PopupEmergencyProps {
  showModal: boolean;
  closeModal: () => void;
}

const PopupEmergency: React.FC<PopupEmergencyProps> = ({ showModal, closeModal }) => {
  const [emergencyName, setEmergencyName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [emergencyLevel, setEmergencyLevel] = useState<string>(Emergency.Low);

  const handleEmergencyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmergencyName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleEmergencyLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEmergencyLevel(event.target.value as Emergency);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Nom de l'urgence:", emergencyName);
    console.log("Description:", description);
    console.log("Niveau d'urgence:", emergencyLevel);
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Déclarer un incident</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="emergencyName">
            <Form.Label>Nom de l'incident</Form.Label>
            <Form.Control type="text" placeholder="Entrez le nom de l'urgence" value={emergencyName} onChange={handleEmergencyNameChange} />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description de l'incident</Form.Label>
            <Form.Control type="text" placeholder="Entrez la description de l'incident" value={description} onChange={handleDescriptionChange} />
          </Form.Group>

          <Form.Group controlId="formGridCategorie">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select name="emergency" value={emergencyLevel} onChange={handleEmergencyLevelChange} >
              {Object.keys(Emergency).map((key) => (
                <option key={key} value={Emergency[key as keyof typeof Emergency]}>
                  {Emergency[key as keyof typeof Emergency]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="secondary" onClick={closeModal}>
              Fermer
            </Button>
            <Button variant="primary" type="submit">
              Créer
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PopupEmergency;
