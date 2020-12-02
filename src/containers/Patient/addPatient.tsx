import React, { useEffect, useRef, useState } from 'react';
import Error from 'next/error';
import { NextPage, NextPageContext } from 'next';

import { FormErrors, Input, InputGroup, InputValidationTypes, Label, Select } from 'components/Input/input';
import { SubSectionHeader } from 'components/SectionHeader/sectionHeader';
import Card, { CardHeader, CardTabs } from 'components/Card/card';
import { PatientTabs } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import styles from './patient.module.scss';
import requestClient from 'lib/requestClient';
import { dataURLtoFile, formatDateForCalendar, getAge } from 'lib/utils';
import Modal from 'components/Modal/modal';
import ProgressBar from 'components/ProgressBar/progressBar';
import Router from 'next/router';
import Camera from 'react-html5-camera-photo';

export interface ISpecies {
  name: string;
}
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
  otherSpecie: string;
  otherPurposeOfKepping: string;
  otherVaccination: string;
}

const AddPatient: NextPage<{ clientId: string }> = ({ clientId }) => {
  const [age, setAge] = useState('');
  const [patientInput, setPatientInput] = useState<IAddPatient>({
    clientId: clientId,
    name: '',
    specie: '',
    breed: '',
    gender: '',
    colour: '',
    dob: '',
    status: 'Alive',
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
    imageUrl: '',
    otherSpecie: '',
    otherPurposeOfKepping: '',
    otherVaccination: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState('');
  const fileInput = useRef();

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
      "specie": patientInput.specie === "Others" ? patientInput.otherSpecie : patientInput.specie,
      "breed": patientInput.breed,
      "gender": patientInput.gender,
      "colour": patientInput.colour,
      "dob": patientInput.dob,
      "status": patientInput.status,
      "ageWhenAcquired": patientInput.ageWhenAcquired,
      "source": patientInput.source,
      "flockHerdSize": patientInput.flockHerdSize,
      "purposeOfKepping": patientInput.purposeOfKepping === '5' ? patientInput.otherPurposeOfKepping : patientInput.purposeOfKepping,
      "typeOfFood": patientInput.typeOfFood,
      "waterSource": patientInput.waterSource,
      "managementSystem": patientInput.managementSystem,
      "vaccination": patientInput.vaccination === '4' ? patientInput.otherVaccination : patientInput.vaccination,
      "vaccineUsed": patientInput.vaccineUsed ? patientInput.vaccineUsed : '',
      "treatmentWarnings": patientInput.treatmentWarnings ? patientInput.treatmentWarnings : '',
      "imageUrl": patientInput.imageUrl,

    })
      .then(response => {
        setLoading(false);
        if (response.status === 201 && response.statusText === 'Created') {
          setShowModal(true);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message)
      })
  };
  useEffect(() => {
    let age = getAge(patientInput.dob);
    setAge(age);
  }, [patientInput.dob]);

  const sendToCloudinary = (formData: FormData) => {
    requestClient.post('images', formData, {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        setPercentage(Math.floor((loaded * 100) / total));
      }
    })
      .then(res => {
        setLoading(false);
        patientInput.imageUrl = res.data.imageUrl;
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  const handleFileChange = (e: any) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    //  @ts-ignore
    formData.append('image', fileInput?.current?.files[0]);
    sendToCloudinary(formData);
  };


  const handleTakePhoto = (dataUri: any) => {
    const randomNumber = Math.floor(Math.random() * Math.floor(1000000));
    const file = dataURLtoFile(dataUri, `patientImage${randomNumber}.png`)
    setShowCameraModal(false);
    let formData = new FormData();
    //  @ts-ignore
    formData.append('image', file);
    sendToCloudinary(formData);
  }

  const useCamera = () => {
    setShowCameraModal(true);
  }

  return (!clientId ? <Error statusCode={404} title="No client found, kindly register a client, before adding a new patient" /> :
    <div>
      <Card>
        <CardHeader>Add New Patient</CardHeader>
        <CardTabs items={PatientTabs} />
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
              {patientInput.specie === 'Others' &&
                <InputGroup horizontal>
                  <Label>Enter patient Specie</Label>
                  <Input
                    autoComplete="true"
                    handleInputChange={handleInputChange}
                    name="otherSpecie"
                    required
                    type="text"
                    validation={InputValidationTypes.text}
                    value={patientInput.otherSpecie}
                  />
                </InputGroup>
              }
              <InputGroup horizontal>
                <Label>Breed</Label>
                {/* <Select
                  onChange={handleInputChange}
                  name="breed"
                  required
                  value={patientInput.breed}
                >
                  <option value="">select a Breed</option>
                  {
                    species.length > 0 && species.map(specie => <option key={species.indexOf(specie)} value={specie.name}>{specie.name}</option>)
                  }
                </Select> */}
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
                  max={formatDateForCalendar(new Date().toISOString())}
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
                  defaultValue={age}
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
            <div style={{ margin: '0 auto' }}>
              <div className={styles.PhotoBox}>
                <div>
                  {
                    patientInput.imageUrl !== '' ?
                      <img src={patientInput.imageUrl} alt="patient photo" /> :
                      <img src={require('../../assets/images/paw.png')} alt="patient photo" />
                  }
                </div>
                <Input
                  hidden
                  //  @ts-ignore
                  ref={fileInput}
                  type="file"
                  accept="image/gif, image/jpeg, image/png"
                  onChange={handleFileChange}
                />
                <Button onClick={(event: any) => {
                  event.preventDefault();
                  //  @ts-ignore
                  fileInput?.current?.click();
                }}>Browse</Button>
                <Button htmlType="button" onClick={useCamera}>use camera</Button>
              </div>
              {
                //  @ts-ignore
                fileInput?.current?.files.length > 0 &&
                <ProgressBar key={0} bgcolor="#1E638F" completed={percentage} />
              }
            </div>
          </div>
          <hr />
          <SubSectionHeader title="animal history" />
          <div className={styles.cardBodyPatient}>
            <div>
              <InputGroup horizontal>
                <Label>Age when acquired</Label>
                <Input
                  handleInputChange={handleInputChange}
                  name="ageWhenAcquired"
                  required
                  type="text"
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
                  validation={InputValidationTypes.freeText}
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
                  validation={InputValidationTypes.number}
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
                  <option value="Breeding">Breeding</option>
                  <option value="Companion">Companion</option>
                  <option value="Security">Security</option>
                  <option value="Consumption">Consumption</option>
                  <option value="Others">Others</option>
                </Select>
              </InputGroup>
              {patientInput.purposeOfKepping === 'Others' &&
                <InputGroup horizontal>
                  <Label>Enter purpose of keeping</Label>
                  <Input
                    handleInputChange={handleInputChange}
                    name="otherPurposeOfKepping"
                    required
                    type="text"
                    validation={InputValidationTypes.text}
                    value={patientInput.otherPurposeOfKepping}
                  />
                </InputGroup>
              }
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
                  <option value="Borehole">Borehole</option>
                  <option value="Tap Water">Tap Water</option>
                  <option value="Well Water">Well Water</option>
                  <option value="Stream">Stream</option>
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
                  <option value="Intensive">Intensive</option>
                  <option value="Semi-Intensive">Semi-Intensive</option>
                  <option value="Extensive">Extensive</option>
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
                  <option value="Rabies">Rabies</option>
                  <option value="DHLPP">DHLPP</option>
                  <option value="Rabies and DHLPP">Rabies and DHLPP</option>
                  <option value="Others">Others</option>
                  <option value="None">None</option>
                </Select>
              </InputGroup>
              {patientInput.vaccination === 'Others' &&
                <InputGroup horizontal>
                  <Label>Enter vaccination type</Label>
                  <Input
                    handleInputChange={handleInputChange}
                    name="otherVaccination"
                    required
                    type="text"
                    validation={InputValidationTypes.text}
                    value={patientInput.otherVaccination}
                  />
                </InputGroup>
              }
              <InputGroup horizontal>
                <Label>vaccine used</Label>
                <Input
                  autoComplete="true"
                  handleInputChange={handleInputChange}
                  name="vaccineUsed"
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
                  type="text"
                  validation={InputValidationTypes.text}
                  value={patientInput.treatmentWarnings}
                />
              </InputGroup>
            </div>
          </div>
          <FormErrors errors={error} />
          <div className={styles.button}>
            <Button
              type={ButtonTypes.primary}
              htmlType="sumbit"
              loading={loading}
            >Add New Patient</Button><Button type={ButtonTypes.grey} href="/app/patient">Cancel</Button>
          </div>
        </form>
        <Modal
          visible={showModal}
          title="New Patient Added"
          subtitle="New Patient has been added successfully"
          closeModal={() => {
            setShowModal(false);
            Router.push('/app/patient');
          }}
        >
          <Button
            className={styles.centerButton}
            onClick={() => {
              setShowModal(false);
              Router.push('/app/patient');
            }}>OK, Go back to patient list</Button>
        </Modal>
        <Modal
          closeModal={() => setShowCameraModal(false)}
          visible={showCameraModal}
        >
          <Camera
            onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
          />
        </Modal>
      </Card>
    </div>
  );
};

AddPatient.getInitialProps = async ({ query }: NextPageContext) => {
  const clientId = (query && query.id) as string;
  return {
    clientId,
  };
}

export default AddPatient;
