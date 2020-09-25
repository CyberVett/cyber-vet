import React, { useState } from 'react';

import { Input, InputGroup, InputValidationTypes, Label, Select } from 'components/Input/input';
import SectionHeader, { SubSectionHeader } from 'components/SectionHeader/sectionHeader';
import Card, { CardTabs } from 'components/Card/card';
import { PatientTabs } from 'config/constants';
import Button from 'components/Button/button';

import styles from './patient.module.scss';
import requestClient from 'lib/requestClient';
import { getAge } from 'lib/utils';
import { NextPage, NextPageContext } from 'next';
import Modal from 'components/Modal/modal';

interface IAddPatient {
  clientId: string;
  name: string;
  specie: string;
  breed: string;
  gender: string;
  colour: string;
  dob: string;
  status: string;
  ageWhenAcquired: string;
  source: string;
  flockHerdSize: string
  purposeOfKepping: string;
  typeOfFood: string;
  waterSource: string;
  managementSystem: string;
  vaccination: string;
  vaccineUsed: string;
  treatmentWarnings: string;
  imageUrl: string;
}

const AddPatient: NextPage<{ clientId: string }> = ({ clientId }) => {

  const [patientInput, setPatientInput] = useState<IAddPatient>({
    clientId: clientId,
    name: '',
    specie: '',
    breed: '',
    gender: '',
    colour: '',
    dob: '',
    status: '',
    ageWhenAcquired: '',
    source: '',
    flockHerdSize: '',
    purposeOfKepping: '',
    typeOfFood: '',
    waterSource: '',
    managementSystem: '',
    vaccination: '',
    vaccineUsed: '',
    treatmentWarnings: '',
    imageUrl: 'https://via.placeholder.com/150',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
    event.persist();
    setPatientInput((input: any) => ({
      ...input,
      [event.target.name]: event.target.value
    }));
  };  

  const submitPatientForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    requestClient.post('patients', {
      "clientId": patientInput.clientId,
      "name": patientInput.name,
      "specie": patientInput.specie,
      "breed": patientInput.breed,
      "gender": patientInput.gender,
      "colour": patientInput.colour,
      "dob": patientInput.dob,
      "status": patientInput.status,
      "ageWhenAcquired": patientInput.ageWhenAcquired,
      "source": patientInput.source,
      "flockHerdSize": patientInput.flockHerdSize,
      "purposeOfKepping": patientInput.purposeOfKepping,
      "typeOfFood": patientInput.typeOfFood,
      "waterSource": patientInput.waterSource,
      "managementSystem": patientInput.managementSystem,
      "vaccination": patientInput.vaccination,
      "vaccineUsed": patientInput.vaccineUsed,
      "treatmentWarnings": patientInput.treatmentWarnings,
      "imageUrl": patientInput.imageUrl,

    })
      .then(response => {
        setLoading(false);
        console.log(response);
        if (response.status === 201 && response.statusText === 'Created') {
          setShowModal(true);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      })
  };
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Card>
            <CardTabs items={PatientTabs} />
            <SectionHeader title="Add New Patient" />
            <SubSectionHeader title="Signalment" />
            <form onSubmit={e => submitPatientForm(e)}>
              <div className={styles.cardBodyPatient}>
                <div>
                  <InputGroup horizontal>
                    <Label>Patient Name</Label>
                    <Input
                      autoComplete="true"
                      handleInputChange={handleInputChange}
                      name="name"
                      required
                      type="text"
                      validation={InputValidationTypes.text}
                      value={patientInput.name}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Patient Specie</Label>
                    <Select
                      onChange={handleInputChange}
                      name="specie"
                      required
                      value={patientInput.specie}
                    >
                      <option value="">select a specie</option>
                      <option value="Canine">Canine</option>
                      <option value="Feline">Feline</option>
                      <option value="Leporine">Leporine</option>
                      <option value="Bovine">Bovine</option>
                      <option value="Caprine">Caprine</option>
                      <option value="Ovine">Ovine</option>
                      <option value="Avian">Avian</option>
                      <option value="Swine">Swine</option>
                      <option value="Others">Others</option>
                    </Select>
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Breed</Label>
                    <Input
                      autoComplete="true"
                      handleInputChange={handleInputChange}
                      name="breed"
                      required
                      type="text"
                      validation={InputValidationTypes.text}
                      value={patientInput.breed}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Gender</Label>
                    <Select
                      onChange={handleInputChange}
                      name="gender"
                      required
                      value={patientInput.gender}
                    >
                      <option value="">select a gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Neuter">Neuter</option>
                    </Select>
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Color</Label>
                    <Input
                      autoComplete="true"
                      handleInputChange={handleInputChange}
                      name="colour"
                      required
                      type="text"
                      validation={InputValidationTypes.text}
                      value={patientInput.colour}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Date of Birth</Label>
                    <Input
                      autoComplete="true"
                      onChange={handleInputChange}
                      name="dob"
                      required
                      type="date"
                      value={patientInput.dob}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Age</Label>
                    <Input
                      required
                      disabled
                      defaultValue={getAge(patientInput.dob)}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Status</Label>
                    <Select
                      onChange={handleInputChange}
                      name="status"
                      required
                      value={patientInput.status}
                    >
                      <option value="">Select a title</option>
                      <option value="Alive">Alive</option>
                      <option value="Dead">Dead</option>
                    </Select>
                  </InputGroup>
                </div>
                <div>
                  Photo
                </div>
              </div>
              <hr />
              <SubSectionHeader title="animal history" />
              <div className={styles.cardBodyPatient}>
                <div>
                  <InputGroup horizontal>
                    <Label>Age when acquired</Label>
                    <Input
                      autoComplete="true"
                      handleInputChange={handleInputChange}
                      name="ageWhenAcquired"
                      required
                      type="number"
                      validation={InputValidationTypes.alphanumeric}
                      value={patientInput.ageWhenAcquired}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>source</Label>
                    <Input
                      autoComplete="true"
                      handleInputChange={handleInputChange}
                      name="source"
                      required
                      type="text"
                      validation={InputValidationTypes.text}
                      value={patientInput.source}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Flock/Heard Size</Label>
                    <Input
                      autoComplete="true"
                      handleInputChange={handleInputChange}
                      name="flockHerdSize"
                      required
                      type="number"
                      validation={InputValidationTypes.alphanumeric}
                      value={patientInput.flockHerdSize}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>Purpose of keeping</Label>
                    <Select
                      onChange={handleInputChange}
                      name="purposeOfKepping"
                      required
                      value={patientInput.purposeOfKepping}
                    >
                      <option value="">select the purpose of keeping</option>
                      <option value="1">Breeding</option>
                      <option value="2">Companion</option>
                      <option value="3">Security</option>
                      <option value="4">Consumption</option>
                      <option value="5">Others</option>
                    </Select>
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>type of food</Label>
                    <Input
                      handleInputChange={handleInputChange}
                      name="typeOfFood"
                      required
                      type="text"
                      validation={InputValidationTypes.text}
                      value={patientInput.typeOfFood}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>water source</Label>
                    <Select
                      onChange={handleInputChange}
                      name="waterSource"
                      required
                      value={patientInput.waterSource}
                    >
                      <option value="">select a water source</option>
                      <option value="1">Borehole</option>
                      <option value="2">Tap Water</option>
                      <option value="3">Well Water</option>
                      <option value="4">Stream</option>
                    </Select>
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>management system</Label>
                    <Select
                      onChange={handleInputChange}
                      name="managementSystem"
                      required
                      value={patientInput.managementSystem}
                    >
                      <option value="">select a management system</option>
                      <option value="1">Intensive</option>
                      <option value="2">Semi-Intensive</option>
                      <option value="3">Extensive</option>
                    </Select>
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>vaccination</Label>
                    <Select
                      onChange={handleInputChange}
                      name="vaccination"
                      required
                      value={patientInput.vaccination}
                    >
                      <option value="">select a vaccination</option>
                      <option value="1">Rabies</option>
                      <option value="2">DHLPP</option>
                      <option value="3">Rabies and DHLPP</option>
                      <option value="4">Others</option>
                    </Select>
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>vaccine used</Label>
                    <Input
                      autoComplete="true"
                      handleInputChange={handleInputChange}
                      name="vaccineUsed"
                      required
                      type="text"
                      validation={InputValidationTypes.text}
                      value={patientInput.vaccineUsed}
                    />
                  </InputGroup>
                  <InputGroup horizontal>
                    <Label>treatment warnings</Label>
                    <Input
                      autoComplete="true"
                      handleInputChange={handleInputChange}
                      name="treatmentWarnings"
                      required
                      type="text"
                      validation={InputValidationTypes.text}
                      value={patientInput.treatmentWarnings}
                    />
                  </InputGroup>
                </div>
              </div>
              <div className={styles.button}>
                <Button
                  htmlType="sumbit"
                  loading={loading}
                >Continue</Button><Button href="/app/dashboard">Cancel</Button>
              </div>
            </form>
            <Modal
              visible={showModal}
              title="New Patient Added"
              subtitle="New Patient has been added successfully"
              closeModal={() => {setShowModal(false)}}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

AddPatient.getInitialProps = async ({ query }: NextPageContext) => {
  const clientId  = (query && query.id) as string;
  return {
    clientId,
  };
}

export default AddPatient;
