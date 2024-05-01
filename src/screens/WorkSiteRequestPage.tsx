import React, { useState, ChangeEvent } from 'react';
import { Form, Button } from 'react-bootstrap';


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
    <form onSubmit={handleSubmit}>

    <h1>Création d'une demande de chantier</h1>
      <div style={{ border: '1px solid #ccc', padding: '70px', borderRadius: '5px', background: '#fff' }}>


        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Informations du client</h2>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>


            <div className="form-group">
              <label htmlFor="name" >Nom</label>
              <Form.Control type="text" name="name" value={formData.customer.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">Prénom</label>
              <Form.Control type="text" name="firstname" value={formData.customer.firstname} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="civility">Civilité:</label>
              <Form.Select name="civility" value={formData.customer.civility} onChange={handleChange}  >
                <option value="M">M</option>
                <option value="Mme">Mme</option>
                <option value="Mlle">Mlle</option>
              </Form.Select>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>

            <div className="form-group">
              <label htmlFor="phoneNumber">Téléphone</label>
              <Form.Control type="text" name="phoneNumber" value={formData.customer.phoneNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Form.Control type="text" name="email" value={formData.customer.email} onChange={handleChange} />
            </div>


          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <div className="form-group">
              <label htmlFor="address">Adresse</label>
              <Form.Control type="text" name="address" value={formData.customer.address} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Code postal</label>
              <Form.Control type="text" name="postalCode" value={formData.customer.postalCode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="city">Ville</label>
              <Form.Control type="text" name="city" value={formData.customer.city} onChange={handleChange} />
            </div>


          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <Form.Control type="text" name="status" value={formData.customer.status} onChange={handleChange} />
            </div>

          </div>
        </div>
      </div>
      <h2>Horraires Livraison</h2>
      <div style={{ border: '1px solid #ccc', padding: '70px', borderRadius: '5px', background: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
          <div className="form-group">
            <label>Heure d'arrivée</label>
            <Form.Control
              type="time"
              value={formData.customer.hourArrival}
              onChange={(e) => handleTimeChange("hourArrival", e.target.value)}
              style={{ width: '100px' }}
            />
          </div>
          <div className="form-group">
            <Form.Label>Heure de départ</Form.Label>
            <Form.Control
              type="time"
              value={formData.customer.hourDeparture}
              onChange={(e) => handleTimeChange("hourDeparture", e.target.value)}
              style={{ width: '100px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hourReturnDeposit">Heure de retour du dépôt</label>
            <Form.Control type="time" name="hourReturnDeposit" value={formData.worksiteDemand.hourReturnDeposit} onChange={handleChange} style={{ width: '100px' }} />
          </div>
        </div>
      </div>
      <h2>Informations pour la demande de chantier</h2>

      <div style={{ border: '1px solid #ccc', padding: '70px', borderRadius: '5px', background: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <div className="form-group-switch">
              <label htmlFor="removal">Enlèvement</label>
              <Form.Switch name="removal" checked={formData.worksiteDemand.removal} onChange={handleChange} />
            </div>
            <div className="form-group-switch">
              <label htmlFor="delivery">Livraison</label>
              <Form.Switch name="delivery" checked={formData.worksiteDemand.delivery} onChange={handleChange} />
            </div>
            <div className="form-group-switch">
              <label htmlFor="removalRecycling">Enlèvement déchetterie</label>
              <Form.Switch name="removalRecycling" checked={formData.worksiteDemand.removalRecycling} onChange={handleChange} />
            </div>
            <div className="form-group-switch">
              <label htmlFor="chronoQuote">Chrono pour devis</label>
              <Form.Switch name="chronoQuote" checked={formData.worksiteDemand.chronoQuote} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <div className="form-group">
              <label htmlFor="conciergeName">Nom du concierge</label>
              <Form.Control type="text" name="conciergeName" value={formData.worksiteDemand.conciergeName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="hourReturnDeposit">Date</label>
              <Form.Control type="date" name="hourReturnDeposit" value={formData.worksiteDemand.hourReturnDeposit} onChange={handleChange} style={{ width: '100px' }} />
            </div>


          </div>

          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <div className="form-group">
              <label htmlFor="commandStatus">Statut de la commande</label>
              <Form.Control type="text" name="commandStatus" value={formData.worksiteDemand.commandStatus} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="emergency">Urgence</label>
              <Form.Select name="emergency" value={formData.worksiteDemand.emergency} onChange={handleChange}>
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="form-group">
              <label htmlFor="detailDelivery">Détails de la livraison</label>
              <Form.Control type="text" name="detailDelivery" value={formData.worksiteDemand.detailDelivery} onChange={handleChange} />
            </div>

          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <div className="form-group">
              <label htmlFor="tezeaAffectation">Affectation Tezea</label>
              <Form.Control type="text" name="tezeaAffectation" value={formData.worksiteDemand.tezeaAffectation} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="provider">Prestataire</label>
              <Form.Control type="text" name="provider" value={formData.worksiteDemand.provider} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="satisfaction">Satisfaction</label>
              <Form.Select name="satisfaction" value={formData.worksiteDemand.satisfaction} onChange={handleChange}>
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </div>


          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <div className="form-group">
              <label htmlFor="weightEstimate">Estimation du poids</label>
              <Form.Control type="number" name="weightEstimate" value={formData.worksiteDemand.weightEstimate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="volumeEstimation">Estimation du volume</label>
              <Form.Control type="number" name="volumeEstimation" value={formData.worksiteDemand.volumeEstimation} onChange={handleChange} />
            </div>
          </div>
        </div>

      </div>
      <button type="submit">Submit</button>
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
    </form>
  );

};

export default WorkSiteRequestPage;
