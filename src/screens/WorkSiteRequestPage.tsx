import React, { useState, ChangeEvent } from 'react';
import { Form, Col, Row, Button, Container } from 'react-bootstrap';
import { Civility, CustomerStatus, Service, Emergency, Category, WorkSiteStatus, WorkSiteRequestStatus } from '../api/Model';



const WorkSiteRequestPage: React.FC = () => {
  const [formData, setFormData] = useState({
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
    },
    worksiteRequest: {
      id: '',
      concierge: { id: '', firstName: '', lastName: '', role: '', email: '', phoneNumber: '' },
      siteChief: undefined,
      customer: { id: '', firstName: '', lastName: '', civility: Civility.M, email: '', phoneNumber: '', address: '', city: '', postalCode: 0, status: CustomerStatus.Business, company: '', requests: [] },
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
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTimeChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      worksiteRequest: {
        ...formData.worksiteRequest,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here
    console.log(formData);
  };


  return (
    <Form>
      <Container>
        <Row className="mb-5"></Row>
        <Row className="mb-5" style={{ color: '#008FE3', fontSize: '32px' }}>

          Informations du client :
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridNom">
            <Form.Label >Nom</Form.Label>
            <Form.Control type="text" placeholder="Entrez un nom" value={formData.customer.lastName} onChange={handleChange} name="name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label >Prénom</Form.Label>
            <Form.Control type="text" placeholder="Entrez un prénom" value={formData.customer.firstName} onChange={handleChange} name="firstname" />
          </Form.Group>

          <Form.Group as={Col} xs={2} controlId="formGridCivility">
            <Form.Label >Civilité</Form.Label>
            <Form.Select name="civility" value={formData.customer.civility} onChange={handleChange} >
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
            <Form.Control type="text" placeholder="Entrez un numéro de téléphone" value={formData.customer.phoneNumber} onChange={handleChange} name="phoneNumber" />
          </Form.Group>

          <Form.Group as={Col} xs={8} controlId="formGridEmail">
            <Form.Label >Email</Form.Label>
            <Form.Control type="email" placeholder="Entrez une adresse email" value={formData.customer.email} onChange={handleChange} name="email" />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} xs={5} controlId="formGridAddress">
            <Form.Label >Adresse</Form.Label>
            <Form.Control type="text" placeholder="Entrez une adresse" value={formData.customer.address} onChange={handleChange} name="address" />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridPostalCode">
            <Form.Label>Code postal</Form.Label>
            <Form.Control type="text" placeholder="Entrez un code postal" value={formData.customer.postalCode} onChange={handleChange} name="postalCode" />
          </Form.Group>

          <Form.Group as={Col} xs={4} controlId="formGridCity">
            <Form.Label >Ville</Form.Label>
            <Form.Control type="text" placeholder="Entrez une ville" value={formData.customer.city} onChange={handleChange} name="city" />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label >Status</Form.Label>
            <Form.Select name="status" value={formData.customer.status} onChange={handleChange} >
              {Object.keys(CustomerStatus).map((key) => (
                <option key={key} value={CustomerStatus[key as keyof typeof CustomerStatus]}>
                  {CustomerStatus[key as keyof typeof CustomerStatus]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} xs={8} controlId="formGridCity">
            <Form.Label >Société</Form.Label>
            <Form.Control type="text" placeholder="Entrez le nom d'une société" value={formData.customer.company} onChange={handleChange} name="city" />
          </Form.Group>

        </Row>
        <Row className="mb-5"></Row>
        <Row className="mb-5" style={{ color: '#008FE3', fontSize: '32px' }}>

          Informations sur la demande de chantier :
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridService">
            <Form.Label >Type de service</Form.Label>
            <Form.Select name="service" value={formData.worksiteRequest.serviceType} onChange={handleChange} >
              {Object.keys(Service).map((key) => (
                <option key={key} value={Service[key as keyof typeof Service]}>
                  {Service[key as keyof typeof Service]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCategorie">
            <Form.Label >Catégorie</Form.Label>
            <Form.Select name="categorie" value={formData.worksiteRequest.category} onChange={handleChange} >
              {Object.keys(Category).map((key) => (
                <option key={key} value={Category[key as keyof typeof Category]}>
                  {Category[key as keyof typeof Category]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDate">
            <Form.Label >Date</Form.Label>
            <Form.Control type="date" value={formData.worksiteRequest.hourReturnDeposit} onChange={handleChange} />
          </Form.Group>

        </Row>
        <Row className="mb-4" ></Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>
          <Form.Group as={Col} xs={3} controlId="formGridRemoval">
            <Form.Switch type="switch" label="Enlèvement" checked={formData.worksiteRequest.removal} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, removal: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridDelivery">
            <Form.Switch type="switch" label="Livraison" checked={formData.worksiteRequest.delivery} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, delivery: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridRemovalRecycling">
            <Form.Switch type="switch" label="Enlèvement déchetterie" checked={formData.worksiteRequest.removalRecycling} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, removalRecycling: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridChronoQuote">
            <Form.Switch type="switch" label="Chrono pour devis" checked={formData.worksiteRequest.chronoQuote} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, chronoQuote: e.target.checked } })} />
          </Form.Group>
        </Row>

        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridHourArrival">
            <Form.Label>Heure d'arrivée du client</Form.Label>
            <Form.Control type="time" value={formData.worksiteRequest.hourArrival} onChange={(e) => handleTimeChange("hourArrival", e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHourDeparture">
            <Form.Label >Heure de départ du client</Form.Label>
            <Form.Control type="time" value={formData.worksiteRequest.hourDeparture} onChange={(e) => handleTimeChange("hourDeparture", e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridHourReturnDeposit">
            <Form.Label style={{ color: '#008FE3' }}>Heure de retour du dépôt</Form.Label>
            <Form.Control type="time" value={formData.worksiteRequest.hourReturnDeposit} onChange={(e) => handleTimeChange("hourReturnDeposit", e.target.value)} />
          </Form.Group>
        </Row>

        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label >Status de la commande</Form.Label>
            <Form.Select name="requestStatus" value={formData.worksiteRequest.requestStatus} onChange={handleChange} >
              {Object.keys(WorkSiteRequestStatus).map((key) => (
                <option key={key} value={WorkSiteRequestStatus[key as keyof typeof WorkSiteRequestStatus]}>
                  {WorkSiteRequestStatus[key as keyof typeof WorkSiteRequestStatus]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmergency">
            <Form.Label >Urgence</Form.Label>
            <Form.Select name="emergency" value={formData.worksiteRequest.emergency} onChange={handleChange} >
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
            <Form.Control as="textarea" rows={3} placeholder="Entrez les détails de la livraison" value={formData.worksiteRequest.description} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, description: e.target.value } })} />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridTezeaAffectation">
            <Form.Label style={{ color: '#008FE3' }}>Affectation Tezea</Form.Label>
            <Form.Control type="text" placeholder="Entrez l'affectation Tezea" value={formData.worksiteRequest.tezeaAffectation} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, tezeaAffectation: e.target.value } })} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridProvider">
            <Form.Label style={{ color: '#008FE3' }}>Prestataire</Form.Label>
            <Form.Control type="text" placeholder="Entrez le prestataire" value={formData.worksiteRequest.provider} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, provider: e.target.value } })} />
          </Form.Group>


        </Row>
        <Row className="mb-3" style={{ color: '#008FE3', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridWeightEstimate">
            <Form.Label style={{ color: '#008FE3' }}>Estimation du poids</Form.Label>
            <Form.Control type="number" placeholder="Entrez l'estimation du poids" value={formData.worksiteRequest.weightEstimate} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, weightEstimate: parseInt(e.target.value) } })} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridVolumeEstimation">
            <Form.Label style={{ color: '#008FE3' }}>Estimation du volume</Form.Label>
            <Form.Control type="number" placeholder="Entrez l'estimation du volume" value={formData.worksiteRequest.volumeEstimation} onChange={(e) => setFormData({ ...formData, worksiteRequest: { ...formData.worksiteRequest, volumeEstimation: parseInt(e.target.value) } })} />
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
