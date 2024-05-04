import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { WorkSiteRequest, User, Customer, Role, Emergency, Civility, CustomerStatus, Service, WorkSiteRequestStatus, Category } from '../api/Model';
import { ReactComponent as ModifyPencil } from 'bootstrap-icons/icons/pencil-square.svg';
import { Link, useNavigate } from 'react-router-dom';

const mockStaff: User = { id: '1', firstName: 'John', lastName: 'Doe', role: Role.Employee, email: 'john@example.com', phoneNumber: '123456789' };



interface ModalProps {
  show: boolean;
  onHide: () => void;
  worksiteRequest: WorkSiteRequest;
}

const WorkSiteRequestPopUp: React.FC<ModalProps> = (props) => {
  const { show, onHide, worksiteRequest }: ModalProps = props;

  const navigate = useNavigate();

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
    console.log(worksiteRequest);
    navigate("/creerDemande", { state: {worksiteRequest}})
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
          <Modal.Title style={{ display: "flex", alignItems: "center", justifyContent: "center" }} id="contained-modal-title-vcenter">Recapitulatif demande n° {worksiteRequest?.id} - </Modal.Title>
          <div>
            <Button onClick={() => handleEdit()} variant="link" style={{ gap: 3, margin: 5, color: '#008FE3', display: "flex", flexDirection: "row", alignItems: "center" }}>
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
            <Col>Nom : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.lastName : ''}</span></Col>
            <Col>Prénom : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.firstName : ''}</span></Col>
            <Col>Civilité : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.civility : ''}</span></Col>
          </Row>

          <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Téléphone : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.phoneNumber : ''}</span></Col>
            <Col>Email : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.email : ''}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Adresse : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.address : ''}</span></Col>
            <Col>Code postal : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.postalCode : ''}</span></Col>
            <Col>Ville : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.city : ''}</span></Col>
          </Row>

          <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Status : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.status : ''}</span></Col>
            <Col>Société : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.company : ''}</span></Col>
            <Col></Col>
          </Row>
        </div>

        <div className="WorkSiteInfo" style={{ marginLeft: '5px' }}>
          <Row className="mb-5" style={{ color: '#008FE3', fontSize: '25px' }}>Informations sur la demande de chantier : </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Nom de la demande : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.title:''}</span></Col>
            <Col>Lieu (ville) : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.city:''}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Type de service : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.serviceType:''}</span></Col>
            <Col>Catégorie : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.category:''}</span></Col>
            <Col>Date : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.estimatedDate ? formatDate(worksiteRequest.estimatedDate) : ''}</span></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Enlèvement : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.removal ? formatBoolean(worksiteRequest.removal) : 'non'}</span></Col>
            <Col>Livraison : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.delivery ? formatBoolean(worksiteRequest.delivery) : 'non'}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Enlèvement déchetterie : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.removalRecycling ? formatBoolean(worksiteRequest.removalRecycling) : 'non'}</span></Col>
            <Col>Chrono pour devis : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.chronoQuote ? formatBoolean(worksiteRequest.chronoQuote) : 'non'}</span></Col>
            <Col></Col>
          </Row>


          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Status de la commande : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.requestStatus:''}</span></Col>
            <Col>Urgence : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.emergency:''}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Détails de la livraison : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.description:''}</span></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Affectation Tezea : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.tezeaAffectation:''}</span></Col>
            <Col>Prestataire : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.provider:''}</span></Col>
            <Col></Col>
          </Row>

          <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
            <Col>Estimation du poids : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.weightEstimate:''}</span></Col>
            <Col>Estimation du volume : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.volumeEstimate:''}</span></Col>
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