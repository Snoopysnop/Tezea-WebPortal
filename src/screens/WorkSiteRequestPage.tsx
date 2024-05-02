import React, { useState, ChangeEvent } from 'react';
import { Form, Col, Row, Button, Container } from 'react-bootstrap';



const WorkSiteRequestPage: React.FC = () => {
  const [formData, setFormData] = useState({
    customer: {
      name: '',
      firstname: '',
      civility: '',
      phoneNumber: '',
      email: '',
      address: '',
      postalCode: '',
      city: '',
      status: '',
      hourArrival: '',
      hourDeparture: '',
    },
    worksiteDemand: {
      removal: false,
      delivery: false,
      removalRecycling: false,
      chronoQuote: false,
      date: new Date(),
      conciergeName: '',
      hourReturnDeposit: '',
      commandStatus: '',
      emergency: 0,
      detailDelivery: '',
      tezeaAffectation: '',
      provider: '',
      satisfaction: 0,
      weightEstimate: 0,
      volumeEstimation: 0,
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const { customer, worksiteDemand } = formData;
    setFormData({
      customer: {
        ...customer,
        [name]: value,
      },
      worksiteDemand: {
        ...worksiteDemand,
        [name]: value,
      },
    });
  };

  const handleTimeChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      customer: {
        ...formData.customer,
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
        <Row className="mb-5" style={{ color: 'white', fontSize: '32px' }}>
          <Col className="mb-3" xs={1}></Col>
          Informations du client :
        </Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridNom">
            <Form.Label >Nom</Form.Label>
            <Form.Control type="text" placeholder="Entrez un nom" value={formData.customer.name} onChange={handleChange} name="name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label >Prénom</Form.Label>
            <Form.Control type="text" placeholder="Entrez un prénom" value={formData.customer.firstname} onChange={handleChange} name="firstname" />
          </Form.Group>

          <Form.Group as={Col} xs={2} controlId="formGridCivility">
            <Form.Label >Civilité</Form.Label>
            <Form.Select name="civility" value={formData.customer.civility} onChange={handleChange} >
              <option value="M">M</option>
              <option value="Mme">Mme</option>
              <option value="Mlle">Mlle</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>
          <Form.Group as={Col} xs={4} controlId="formGridPhoneNumber">
            <Form.Label >Téléphone</Form.Label>
            <Form.Control type="text" placeholder="Entrez un numéro de téléphone" value={formData.customer.phoneNumber} onChange={handleChange} name="phoneNumber" />
          </Form.Group>

          <Form.Group as={Col} xs={8} controlId="formGridEmail">
            <Form.Label >Email</Form.Label>
            <Form.Control type="email" placeholder="Entrez une adresse email" value={formData.customer.email} onChange={handleChange} name="email" />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>

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
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridStatus">
            <Form.Label >Statut</Form.Label>
            <Form.Control type="text" placeholder="Entrez un statut" value={formData.customer.status} onChange={handleChange} name="status" />
          </Form.Group>


        </Row>
        <Row className="mb-5"></Row>
        <Row className="mb-5" style={{ color: 'white', fontSize: '32px' }}>
          <Col className="mb-3" xs={1}></Col>
          Informations sur le chantier :
        </Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>
          <Form.Group as={Col} controlId="formGridConciergeName">
            <Form.Label>Nom du concierge</Form.Label>
            <Form.Control type="text" placeholder="Entrez le nom du concierge" value={formData.worksiteDemand.conciergeName} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, conciergeName: e.target.value } })} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDate">
            <Form.Label >Date</Form.Label>
            <Form.Control type="date" value={formData.worksiteDemand.hourReturnDeposit} onChange={handleChange} />
          </Form.Group>

        </Row>
        <Row className="mb-4" ></Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>
          <Form.Group as={Col} xs={3} controlId="formGridRemoval">
            <Form.Check type="checkbox" label="Enlèvement" checked={formData.worksiteDemand.removal} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, removal: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridDelivery">
            <Form.Check type="checkbox" label="Livraison" checked={formData.worksiteDemand.delivery} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, delivery: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridRemovalRecycling">
            <Form.Check type="checkbox" label="Déchetterie" checked={formData.worksiteDemand.removalRecycling} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, removalRecycling: e.target.checked } })} />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId="formGridChronoQuote">
            <Form.Check type="checkbox" label="Devis" checked={formData.worksiteDemand.chronoQuote} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, chronoQuote: e.target.checked } })} />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridHourArrival">
            <Form.Label>Heure d'arrivée du client</Form.Label>
            <Form.Control type="time" value={formData.customer.hourArrival} onChange={(e) => handleTimeChange("hourArrival", e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHourDeparture">
            <Form.Label >Heure de départ du client</Form.Label>
            <Form.Control type="time" value={formData.customer.hourDeparture} onChange={(e) => handleTimeChange("hourDeparture", e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridHourReturnDeposit">
            <Form.Label style={{ color: 'white' }}>Heure de retour du dépôt</Form.Label>
            <Form.Control type="time" value={formData.worksiteDemand.hourReturnDeposit} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, hourReturnDeposit: e.target.value } })} />
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>

          <Form.Group as={Col} controlId="formGridCommandStatus">
            <Form.Label style={{ color: 'white' }}>Statut de la commande</Form.Label>
            <Form.Control type="text" placeholder="Entrez le statut de la commande" value={formData.worksiteDemand.commandStatus} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, commandStatus: e.target.value } })} />
          </Form.Group>

          <Form.Group as={Col} xs={2} controlId="formGridEmergency">
            <Form.Label style={{ color: 'white' }}>Urgence</Form.Label>
            <Form.Select value={formData.worksiteDemand.emergency} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, emergency: parseInt(e.target.value) } })}>
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>

        <Form.Group as={Col} controlId="formGridDetailDelivery">
          <Form.Label style={{ color: 'white' }}>Détails de la livraison</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Entrez les détails de la livraison" value={formData.worksiteDemand.detailDelivery} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, detailDelivery: e.target.value } })} />
        </Form.Group>
        </Row>
        <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>

        <Form.Group as={Col} controlId="formGridTezeaAffectation">
          <Form.Label style={{ color: 'white' }}>Affectation Tezea</Form.Label>
          <Form.Control type="text" placeholder="Entrez l'affectation Tezea" value={formData.worksiteDemand.tezeaAffectation} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, tezeaAffectation: e.target.value } })} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridProvider">
          <Form.Label style={{ color: 'white' }}>Prestataire</Form.Label>
          <Form.Control type="text" placeholder="Entrez le prestataire" value={formData.worksiteDemand.provider} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, provider: e.target.value } })} />
        </Form.Group>

        <Form.Group as={Col} xs={2} controlId="formGridSatisfaction">
          <Form.Label style={{ color: 'white' }}>Satisfaction</Form.Label>
          <Form.Select value={formData.worksiteDemand.satisfaction} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, satisfaction: parseInt(e.target.value) } })}>
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </Form.Select>
        </Form.Group>
          </Row>
          <Row className="mb-3" style={{ color: 'white', fontSize: '18px' }}>

        <Form.Group as={Col} controlId="formGridWeightEstimate">
          <Form.Label style={{ color: 'white' }}>Estimation du poids</Form.Label>
          <Form.Control type="number" placeholder="Entrez l'estimation du poids" value={formData.worksiteDemand.weightEstimate} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, weightEstimate: parseInt(e.target.value) } })} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridVolumeEstimation">
          <Form.Label style={{ color: 'white' }}>Estimation du volume</Form.Label>
          <Form.Control type="number" placeholder="Entrez l'estimation du volume" value={formData.worksiteDemand.volumeEstimation} onChange={(e) => setFormData({ ...formData, worksiteDemand: { ...formData.worksiteDemand, volumeEstimation: parseInt(e.target.value) } })} />
        </Form.Group>
        </Row>
        <Row className="mb-5"></Row>

      </Container>
    </Form>
    /*
  <style>
    {`
        .form-group {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            align-items: flex-start;
        }
        .form-group-switch {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
        }

        label {
            margin-bottom: 5px;
            align-self: flex-start;
            font-size: 14px;
        }
        input {
            height: 25px;
        }
        h1{
          font-size: 32px;
          text-align: left;
          margin-top:40px;
          margin-bottom: 40px; 
          color: white;
        }
        h2 {
          font-size: 24px;
          text-align: left;
          margin-bottom: 40px; 
      }


        `}
  </style>
</form>*/
  );

};

export default WorkSiteRequestPage;
