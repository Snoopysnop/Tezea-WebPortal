import React from 'react';
import { Button, Modal, Row, Col, Container } from 'react-bootstrap';
import { WorkSiteRequest, User, Customer, Role, Civility, CustomerStatus, Service, WorkSiteRequestStatus, Category } from '../api/Model';
import { ReactComponent as ModifyPencil } from 'bootstrap-icons/icons/pencil-square.svg';
import { Link, useNavigate } from 'react-router-dom';
import { getCategorie, getCivility, getCustomerStatus, getEmergency, getServiceType, getStatusWorksiteRequest } from '../common/utils/utils';
import MainApi from '../api/MainApi';
import { WorkSiteRequestJson } from '../api/ModelJson';




interface ModalProps {
  show: boolean;
  onHide: () => void;
  worksiteRequest: WorkSiteRequest;
  showButtonEditValidate: boolean;
  showButtonCreate: boolean;

}

const WorkSiteRequestPopUp: React.FC<ModalProps> = (props) => {
  const { show, onHide, worksiteRequest, showButtonEditValidate, showButtonCreate }: ModalProps = props;

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

  async function handleValidate() {
    const responseWorksite = await MainApi.getInstance().updateStatusWorksiteRequest(worksiteRequest.id ? worksiteRequest.id : 0, "Standby");

    const responseWorksiteRequest = await MainApi.getInstance().getWorkSiteRequests("creationDate") as WorkSiteRequestJson[];
    const worksiteRequestMapper: WorkSiteRequest[] = responseWorksiteRequest.map(worksiteRequestJson => ({
      id: worksiteRequestJson.id,
      concierge: undefined,
      siteChief: undefined,
      customer: undefined,
      city: worksiteRequestJson.city,
      workSites: undefined,
      serviceType: undefined,
      description: worksiteRequestJson.description,
      emergency: worksiteRequestJson.emergency ? getEmergency(worksiteRequestJson.emergency) : undefined,
      title: worksiteRequestJson.title,
      category: undefined,
      removal: worksiteRequestJson.removal,
      delivery: worksiteRequestJson.delivery,
      removalRecycling: worksiteRequestJson.removalRecycling,
      chronoQuote: worksiteRequestJson.chronoQuote,
      estimatedDate: worksiteRequestJson.estimatedDate ? new Date(worksiteRequestJson.estimatedDate) : new Date(),
      requestStatus: worksiteRequestJson.status ? getStatusWorksiteRequest(worksiteRequestJson.status) : WorkSiteRequestStatus.ToComplete,
      weightEstimate: worksiteRequestJson.weightEstimate,
      volumeEstimate: worksiteRequestJson.volumeEstimate,
      provider: worksiteRequestJson.provider,
      tezeaAffectation: worksiteRequestJson.tezeaAffectation,
    }));

    console.log(worksiteRequestMapper)

    navigate("/worksiteRequestList", { state: { worksiteRequestMapper } })
  }

  function handleEdit() {
    navigate("/worksiteRequestCreate", { state: { worksiteRequest } })
  }

  function handleCreateWorksite() {
    navigate("/worksiteCreate", { state: { worksiteRequest } })
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
          <Modal.Title style={{ display: "flex", alignItems: "center", justifyContent: "center" }} id="contained-modal-title-vcenter">Recapitulatif demande n° {worksiteRequest?.id} </Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body>
        <Container className=" mt-2" style={{ borderColor: '#f3f3f3', borderStyle: 'solid', borderWidth: '2px', borderRadius: '20px' }}>
          <Row>
            <Col className='m-3'>
              <Row className="mb-4" style={{ color: '#008FE3', fontSize: '25px' }}>Informations du client : </Row>

              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Nom : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.lastName : ''}</span></Col>
                <Col>Prénom : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.firstName : ''}</span></Col>
                <Col>Civilité : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.civility ? worksiteRequest.customer.civility : ' ' : ''}</span></Col>
              </Row>

              <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col xs={4}>Téléphone : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.phoneNumber : ''}</span></Col>
                <Col xs={8}>Email : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.email : ''}</span></Col>
                <Col></Col>
              </Row>

              <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Adresse : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.address : ''}</span></Col>
                <Col>Code postal : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.postalCode : ''}</span></Col>
                <Col>Ville : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.city : ''}</span></Col>
              </Row>

              <Row className="mb-3" style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col xs={4}>Status : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.status ? worksiteRequest.customer.status : '' : ''}</span></Col>
                <Col xs={8}>Société : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.customer ? worksiteRequest.customer.company : ''}</span></Col>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container className=" mt-4" style={{ borderColor: '#f3f3f3', borderStyle: 'solid', borderWidth: '2px', borderRadius: '20px' }}>
          <Row>
            <Col className='m-3'>          
            <Row className="mb-4" style={{ color: '#008FE3', fontSize: '25px' }}>Informations sur la demande de chantier : </Row>

              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Nom de la demande : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.title : ''}</span></Col>
                <Col>Lieu (ville) : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.city : ''}</span></Col>
              </Row>

              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Type de service : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.serviceType ? worksiteRequest.serviceType : '' : ''}</span></Col>
                <Col>Date : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.estimatedDate ? formatDate(worksiteRequest.estimatedDate) : ''}</span></Col>
              </Row>

              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Enlèvement : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.removal ? formatBoolean(worksiteRequest.removal) : 'non'}</span></Col>
                <Col>Livraison : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.delivery ? formatBoolean(worksiteRequest.delivery) : 'non'}</span></Col>
              </Row>

              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Enlèvement déchetterie : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.removalRecycling ? formatBoolean(worksiteRequest.removalRecycling) : 'non'}</span></Col>
                <Col>Chrono pour devis : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.chronoQuote ? formatBoolean(worksiteRequest.chronoQuote) : 'non'}</span></Col>
              </Row>


              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col >Urgence : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.emergency ? worksiteRequest.emergency : '' : ''}</span></Col>
                <Col>Catégorie : <span style={{ color: '#000000' }}>{worksiteRequest && worksiteRequest.category ? worksiteRequest.category : ''}</span></Col>
              </Row>

              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Détails de la livraison : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.description : ''}</span></Col>
              </Row>

              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Affectation Tezea : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.tezeaAffectation : ''}</span></Col>
                <Col>Prestataire : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.provider : ''}</span></Col>
              </Row>

              <Row className="mb-3 " style={{ color: '#008FE3', fontSize: '15px' }}>
                <Col>Estimation du poids : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.weightEstimate : ''}</span></Col>
                <Col>Estimation du volume : <span style={{ color: '#000000' }}>{worksiteRequest ? worksiteRequest.volumeEstimate : ''}</span></Col>
              </Row>
            </Col>
          </Row>
        </Container>

        {showButtonCreate && worksiteRequest && worksiteRequest.requestStatus && worksiteRequest.requestStatus === WorkSiteRequestStatus.Standby && (
          <div className="CreateWorkSitButton mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => { onHide(); handleCreateWorksite(); }}>Créer un chantier</Button>
          </div>
        )}

        {showButtonEditValidate && worksiteRequest && worksiteRequest.requestStatus && worksiteRequest.requestStatus === WorkSiteRequestStatus.ToComplete && (
          <div className="Edit mt-3" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="primary" onClick={() => { onHide(); handleEdit(); }}>Modifier la demande</Button>
            <Button variant="success" onClick={() => { onHide(); handleValidate(); }}>Valider la demande</Button>

          </div>
        )}

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WorkSiteRequestPopUp