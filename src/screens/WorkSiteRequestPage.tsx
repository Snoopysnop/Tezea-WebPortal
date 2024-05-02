import React, { useState, ChangeEvent } from 'react';
import { Form, Col, Row, Button, Container } from 'react-bootstrap';
import { Civility, CustomerStatus, Service, Emergency, Category, WorkSiteStatus, WorkSiteRequestStatus } from '../api/Model';



const WorkSiteRequestPage: React.FC = () => {

  const [customerFormData, customerSetFormData] = useState({
    customer: {
      id: '',
      firstName: '',
      lastName: '',
      civility: Civility.M,
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      postalCode: 0,
      status: CustomerStatus.Business,
      company: '',
      requests: []
    }
  });
  const [worksiteRequestFormData, worksiteRequestSetFormData] = useState({
    worksiteRequest: {
      id: '',
      concierge: { id: '', firstName: '', lastName: '', role: '', email: '', phoneNumber: '' },
      siteChief: undefined,
      city: '',
      workSites: undefined,
      serviceType: Service.Service,
      description: '',
      emergency: Emergency.Low,
      status: WorkSiteStatus.Standby,
      title: '',
      category: Category.Conciergerie,
      removal: false,
      delivery: false,
      removalRecycling: false,
      chronoQuote: false,
      date: new Date(),
      requestStatus: WorkSiteRequestStatus.New,
      hourReturnDeposit: '',
      hourArrival: '',
      hourDeparture: '',
      weightEstimate: 0,
      volumeEstimation: 0,
      provider: '',
      tezeaAffectation: ''
    }
  });

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    customerSetFormData({
      ...customerFormData,
      customer: {
        ...customerFormData.customer,
        [name]: value
      }
    });
  };

  const handleWorksiteRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    worksiteRequestSetFormData({
      ...worksiteRequestFormData,
      worksiteRequest: {
        ...worksiteRequestFormData.worksiteRequest,
        [name]: value
      }
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const dateValue = new Date(value);

    worksiteRequestSetFormData({
      ...worksiteRequestFormData,
      worksiteRequest: {
        ...worksiteRequestFormData.worksiteRequest,
        date: dateValue
      }
    });
  };


  const handleTimeChange = (fieldName: string, value: string) => {
    worksiteRequestSetFormData({
      ...worksiteRequestFormData,
      worksiteRequest: {
        ...worksiteRequestFormData.worksiteRequest,
        [fieldName]: value
      }
    });
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO faire la requete au back avec les 2 objets à creer
    console.log(customerFormData, worksiteRequestFormData);
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row className="mb-5"></Row>
        <Row className="mb-5" style={{ color: '#008FE3', fontSize: '32px' }}>

          Informations du client :
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridNom">
            <Form.Label >Nom</Form.Label>
            <Form.Control type="text" placeholder="Entrez un nom" value={customerFormData.customer.lastName} onChange={handleCustomerChange} name="lastName" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label >Prénom</Form.Label>
            <Form.Control type="text" placeholder="Entrez un prénom" value={customerFormData.customer.firstName} onChange={handleCustomerChange} name="firstName" />
          </Form.Group>

          <Form.Group as={Col} xs={2} controlId="formGridCivility">
            <Form.Label >Civilité</Form.Label>
            <Form.Select name="civility" value={customerFormData.customer.civility} onChange={handleCustomerChange} >
              {Object.keys(Civility).map((key) => (
                <option key={key} value={Civility[key as keyof typeof Civility]}>
                  {Civility[key as keyof typeof Civility]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} xs={4} controlId="formGridPhoneNumber">
            <Form.Label >Téléphone</Form.Label>
            <Form.Control type="tel" placeholder="Entrez un numéro de téléphone" value={customerFormData.customer.phoneNumber} onChange={handleCustomerChange} name="phoneNumber" />
          </Form.Group>

          <Form.Group as={Col} xs={8} controlId="formGridEmail">
            <Form.Label >Email</Form.Label>
            <Form.Control type="email" placeholder="Entrez une adresse email" value={customerFormData.customer.email} onChange={handleCustomerChange} name="email" />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} xs={5} controlId="formGridAddress">
            <Form.Label >Adresse</Form.Label>
            <Form.Control type="text" placeholder="Entrez une adresse" value={customerFormData.customer.address} onChange={handleCustomerChange} name="address" />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridPostalCode">
            <Form.Label>Code postal</Form.Label>
            <Form.Control type="text" placeholder="Entrez un code postal" value={customerFormData.customer.postalCode} onChange={handleCustomerChange} name="postalCode" />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridCity">
            <Form.Label >Ville</Form.Label>
            <Form.Control type="text" placeholder="Entrez une ville" value={customerFormData.customer.city} onChange={handleCustomerChange} name="city" />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label >Status</Form.Label>
            <Form.Select name="status" value={customerFormData.customer.status} onChange={handleCustomerChange} >
              {Object.keys(CustomerStatus).map((key) => (
                <option key={key} value={CustomerStatus[key as keyof typeof CustomerStatus]}>
                  {CustomerStatus[key as keyof typeof CustomerStatus]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} xs={8} controlId="formGridCompagny">
            <Form.Label >Société</Form.Label>
            <Form.Control type="text" placeholder="Entrez le nom d'une société" value={customerFormData.customer.company} onChange={handleCustomerChange} name="company" />
          </Form.Group>

        </Row>
        <Row className="mb-5"></Row>
        <Row className="mb-5" style={{ color: '#008FE3', fontSize: '32px' }}>

          Informations sur la demande de chantier :
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Label >Nom de la demande</Form.Label>
            <Form.Control type="title" placeholder="Entrez le nom de la demande de chantier" value={worksiteRequestFormData.worksiteRequest.title} onChange={handleWorksiteRequestChange} name="title" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label >Lieu (ville)</Form.Label>
            <Form.Control type="city"  placeholder="Entrez le nom du lieu" value={worksiteRequestFormData.worksiteRequest.city} onChange={handleWorksiteRequestChange} name="city" />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridService">
            <Form.Label >Type de service</Form.Label>
            <Form.Select name="serviceType" value={worksiteRequestFormData.worksiteRequest.serviceType} onChange={handleWorksiteRequestChange} >
              {Object.keys(Service).map((key) => (
                <option key={key} value={Service[key as keyof typeof Service]}>
                  {Service[key as keyof typeof Service]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCategorie">
            <Form.Label >Catégorie</Form.Label>
            <Form.Select name="category" value={worksiteRequestFormData.worksiteRequest.category} onChange={handleWorksiteRequestChange} >
              {Object.keys(Category).map((key) => (
                <option key={key} value={Category[key as keyof typeof Category]}>
                  {Category[key as keyof typeof Category]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDate">
            <Form.Label >Date</Form.Label>
            <Form.Control type="date" value={worksiteRequestFormData.worksiteRequest.date.toISOString().split('T')[0]} onChange={handleDateChange} name="date" />
          </Form.Group>

        </Row>
        <Row className="mb-4" ></Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} xs={3} controlId="formGridRemoval">
            <Form.Switch type="switch" label="Enlèvement" checked={worksiteRequestFormData.worksiteRequest.removal} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, removal: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridDelivery">
            <Form.Switch type="switch" label="Livraison" checked={worksiteRequestFormData.worksiteRequest.delivery} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, delivery: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridRemovalRecycling">
            <Form.Switch type="switch" label="Enlèvement déchetterie" checked={worksiteRequestFormData.worksiteRequest.removalRecycling} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, removalRecycling: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridChronoQuote">
            <Form.Switch type="switch" label="Chrono pour devis" checked={worksiteRequestFormData.worksiteRequest.chronoQuote} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, chronoQuote: e.target.checked } })} />
          </Form.Group>
        </Row>

        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridHourArrival">
            <Form.Label>Heure d'arrivée du client</Form.Label>
            <Form.Control type="time" value={worksiteRequestFormData.worksiteRequest.hourArrival} onChange={(e) => handleTimeChange("hourArrival", e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHourDeparture">
            <Form.Label >Heure de départ du client</Form.Label>
            <Form.Control type="time" value={worksiteRequestFormData.worksiteRequest.hourDeparture} onChange={(e) => handleTimeChange("hourDeparture", e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridHourReturnDeposit">
            <Form.Label style={{ color: '#008FE3' }}>Heure de retour du dépôt</Form.Label>
            <Form.Control type="time" value={worksiteRequestFormData.worksiteRequest.hourReturnDeposit} onChange={(e) => handleTimeChange("hourReturnDeposit", e.target.value)} />
          </Form.Group>
        </Row>

        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label >Status de la commande</Form.Label>
            <Form.Select name="requestStatus" value={worksiteRequestFormData.worksiteRequest.requestStatus} onChange={handleWorksiteRequestChange} >
              {Object.keys(WorkSiteRequestStatus).map((key) => (
                <option key={key} value={WorkSiteRequestStatus[key as keyof typeof WorkSiteRequestStatus]}>
                  {WorkSiteRequestStatus[key as keyof typeof WorkSiteRequestStatus]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmergency">
            <Form.Label >Urgence</Form.Label>
            <Form.Select name="emergency" value={worksiteRequestFormData.worksiteRequest.emergency} onChange={handleWorksiteRequestChange} >
              {Object.keys(Emergency).map((key) => (
                <option key={key} value={Emergency[key as keyof typeof Emergency]}>
                  {Emergency[key as keyof typeof Emergency]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridDetailDelivery">
            <Form.Label style={{ color: '#008FE3' }}>Détails de la livraison</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Entrez les détails de la livraison" value={worksiteRequestFormData.worksiteRequest.description} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, description: e.target.value } })} />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridTezeaAffectation">
            <Form.Label style={{ color: '#008FE3' }}>Affectation Tezea</Form.Label>
            <Form.Control type="text" placeholder="Entrez l'affectation Tezea" value={worksiteRequestFormData.worksiteRequest.tezeaAffectation} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, tezeaAffectation: e.target.value } })} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridProvider">
            <Form.Label style={{ color: '#008FE3' }}>Prestataire</Form.Label>
            <Form.Control type="text" placeholder="Entrez le prestataire" value={worksiteRequestFormData.worksiteRequest.provider} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, provider: e.target.value } })} />
          </Form.Group>


        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridWeightEstimate">
            <Form.Label style={{ color: '#008FE3' }}>Estimation du poids</Form.Label>
            <Form.Control type="number" placeholder="Entrez l'estimation du poids" value={worksiteRequestFormData.worksiteRequest.weightEstimate} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, weightEstimate: parseInt(e.target.value) } })} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridVolumeEstimation">
            <Form.Label style={{ color: '#008FE3' }}>Estimation du volume</Form.Label>
            <Form.Control type="number" placeholder="Entrez l'estimation du volume" value={worksiteRequestFormData.worksiteRequest.volumeEstimation} onChange={(e) => worksiteRequestSetFormData({ ...worksiteRequestFormData, worksiteRequest: { ...worksiteRequestFormData.worksiteRequest, volumeEstimation: parseInt(e.target.value) } })} />
          </Form.Group>
        </Row>
        <Row className="mb-5"></Row>
        <Row className="mb-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="primary" type="submit" style={{ alignItems: 'center' }}>
            Soumettre
          </Button>
        </Row>
      </Container>

    </Form>
  );

};

export default WorkSiteRequestPage;
