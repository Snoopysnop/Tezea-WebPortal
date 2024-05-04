import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { WorkSiteRequest, User, Customer, Role, Emergency, Civility, CustomerStatus, Service, WorkSiteRequestStatus, Category } from '../api/Model';
import { ReactComponent as ModifyPencil } from 'bootstrap-icons/icons/pencil-square.svg';
import {Link} from 'react-router-dom';

const mockStaff: User = { id: '1', firstName: 'John', lastName: 'Doe', role: Role.Employee, email: 'john@example.com', phoneNumber: '123456789' };

const mockCustomer: Customer = {
  id: "2", firstName: "dominique", lastName: "dubois", civility: Civility.M, email: "john@example.com", phoneNumber: "123456789",
  address: "3 rue du pre", city: "rennes", postalCode: 35000, status: CustomerStatus.Business, company: "peugeot"
};

const mockWorsiteRequest: WorkSiteRequest = {
  id: "1231", concierge: mockStaff, siteChief: undefined, customer: mockCustomer, city: "Rennes", workSites: undefined,
  serviceType: Service.Donation, description: "Chantier pour ramasser du savon sauvage", emergency: Emergency.Low, title: "chantier de ramassage de savon",
  category: Category.Conciergerie, removal: true, delivery: true, removalRecycling: true, chronoQuote: true, date: new Date(2023, 6, 2),
  requestStatus: WorkSiteRequestStatus.New, hourReturnDeposit: "14h", hourArrival: "15", hourDeparture: "17", weightEstimate: 1000, volumeEstimation: 150,
  provider: "provider", tezeaAffectation: "roger"
};


interface ModalProps {
  show: boolean;
  onHide: () => void;
}

const WorkSiteRequestPopUp: React.FC<ModalProps> = (props) => {
  const { show, onHide }: ModalProps = props;

  function formatBoolean(boolean: Boolean) {
    return boolean ? "oui" : "non";
  }
  function formatDate(date: Date) {
    const getDay = date.getDate();
    const getMonth = date.getMonth() + 1;

    const day = getDay < 10 ? '0' + getDay : getDay;
    const month = getMonth < 10 ? '0' + getMonth : getMonth;
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }
  function handleEdit() {
    //TODO, mettre le code pour modifier la demande
    console.log("Modifier la demande :");
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/*TODO fix le css ici*/}
      <Modal.Header closeButton>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Modal.Title style={{ display: "flex", alignItems: "center", justifyContent: "center" }} id="contained-modal-title-vcenter">Recapitulatif demande n° {mockWorsiteRequest.id} - </Modal.Title>
          <div>
            <Button variant="link" style={{ gap: 3, margin: 5, color: '#008FE3', display: "flex", flexDirection: "row", alignItems: "center" }}>
              <ModifyPencil width='22px' height='100%' />
              <div>Editer</div>
            </Button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="CustomerInfo" style={{ marginLeft: '5px' }}>
          <Row className="mb-4" style={{ color: '#008FE3', fontSize: '25px' }}>Informations du client : </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Nom : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.lastName}</span></Col>
            <Col>Prénom : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.firstName}</span></Col>
            <Col>Civilité : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.civility}</span></Col>
          </Row>

          <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Téléphone : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.phoneNumber}</span></Col>
            <Col>Email : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.email}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Adresse : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.address}</span></Col>
            <Col>Code postal : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.postalCode}</span></Col>
            <Col>Ville : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.city}</span></Col>
          </Row>

          <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Status : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.status}</span></Col>
            <Col>Société : <span style={{ color: '#000000' }}>{mockWorsiteRequest.customer.company}</span></Col>
            <Col></Col>
          </Row>
        </div>

        <div className="WorkSiteInfo" style={{ marginLeft: '5px' }}>
          <Row className="mb-5" style={{ color: '#008FE3', fontSize: '25px' }}>Informations sur la demande de chantier : </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Nom de la demande : <span style={{ color: '#000000' }}>{mockWorsiteRequest.title}</span></Col>
            <Col>Lieu (ville) : <span style={{ color: '#000000' }}>{mockWorsiteRequest.city}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Type de service : <span style={{ color: '#000000' }}>{mockWorsiteRequest.serviceType}</span></Col>
            <Col>Catégorie : <span style={{ color: '#000000' }}>{mockWorsiteRequest.category}</span></Col>
            <Col>Date : <span style={{ color: '#000000' }}>{formatDate(mockWorsiteRequest.date)}</span></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Enlèvement : <span style={{ color: '#000000' }}>{formatBoolean(mockWorsiteRequest.removal)}</span></Col>
            <Col>Livraison : <span style={{ color: '#000000' }}>{formatBoolean(mockWorsiteRequest.delivery)}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Enlèvement déchetterie : <span style={{ color: '#000000' }}>{formatBoolean(mockWorsiteRequest.removalRecycling)}</span></Col>
            <Col>Chrono pour devis : <span style={{ color: '#000000' }}>{formatBoolean(mockWorsiteRequest.chronoQuote)}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Heure d'arrivée du client : <span style={{ color: '#000000' }}>{mockWorsiteRequest.hourArrival}</span></Col>
            <Col>Heure de départ du client : <span style={{ color: '#000000' }}>{mockWorsiteRequest.hourDeparture}</span></Col>
            <Col>Heure de retour du dépôt : <span style={{ color: '#000000' }}>{mockWorsiteRequest.hourReturnDeposit}</span></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Status de la commande : <span style={{ color: '#000000' }}>{mockWorsiteRequest.requestStatus}</span></Col>
            <Col>Urgence : <span style={{ color: '#000000' }}>{mockWorsiteRequest.emergency}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Détails de la livraison : <span style={{ color: '#000000' }}>{mockWorsiteRequest.description}</span></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Affectation Tezea : <span style={{ color: '#000000' }}>{mockWorsiteRequest.tezeaAffectation}</span></Col>
            <Col>Prestataire : <span style={{ color: '#000000' }}>{mockWorsiteRequest.provider}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Estimation du poids : <span style={{ color: '#000000' }}>{mockWorsiteRequest.weightEstimate}</span></Col>
            <Col>Estimation du volume : <span style={{ color: '#000000' }}>{mockWorsiteRequest.volumeEstimation}</span></Col>
            <Col></Col>
          </Row>
        </div>
        <div className="CreateWorkSitButton" style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/creerChantier">
            <Button onClick={onHide}>Créer un chantier</Button>
          </Link>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WorkSiteRequestPopUp