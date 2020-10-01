import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import { FormErrors, Input, InputGroup, InputValidationTypes, Label, Select } from 'components/Input/input';
import SectionHeader from 'components/SectionHeader/sectionHeader';
import Card from 'components/Card/card';
import Button from 'components/Button/button';
import ProgressBar from 'components/ProgressBar/progressBar';
import requestClient from 'lib/requestClient';
import Modal from 'components/Modal/modal';

import styles from './admin.module.scss';
import patientStyles from '../Patient/patient.module.scss';

interface IAccount {
  accountId: string;
  password: string;
  role: string;
};

interface IRole {
  id: string;
  name: string;
}

interface IAddStaff {
  account: IAccount;
  title: string;
  firstName: string;
  lastName: string;
  otherName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  imageUrl: string;
}

const AddStaff: React.FunctionComponent = () => {
  const [staffInput, setStaffInput] = useState<IAddStaff>({
    account: {
      accountId: '',
      password: '',
      role: ''
    },
    title: '',
    firstName: '',
    lastName: '',
    otherName: ' ',
    gender: '',
    phoneNumber: '',
    password: '',
    role: '',
    email: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<IRole[]>([]);
  const [percentage, setPercentage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const fileInput = useRef();


  const handleInputChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
    event.persist();
    setStaffInput((input: any) => ({
      ...input,
      [event.target.name]: event.target.value
    }));
  };
  const handleFileChange = (e: any) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append('image', fileInput?.current?.files[0]);
    requestClient.post('images', formData, {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        setPercentage(Math.floor((loaded * 100) / total));
      }
    })
      .then(res => {
        setLoading(false);
        staffInput.imageUrl = res.data.imageUrl;

      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    requestClient.get('roles')
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setRole(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }, [])

  const submitStaffForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    requestClient.post('staff', {
      "account": {
        "accountId": staffInput.email,
        "password": staffInput.password,
        "role": staffInput.role
      },
      "title": staffInput.title,
      "firstName": staffInput.firstName,
      "lastName": staffInput.lastName,
      "otherName": staffInput.otherName,
      "gender": staffInput.gender,
      "phoneNumber": staffInput.phoneNumber,
      "imageUrl": staffInput.imageUrl
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          // setResponse(response.data.message);
          setShowModal(true);
          Router.push({
            pathname: '/app/admin',
          });
        } else {
          setLoading(false);
          setError(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error);
        console.log('error', error);
      })
  };

  return (
    <div className={styles.container}>
      <div>
        <div>
          <Card>
            <SectionHeader title="Add New Staff" />
            <div className={styles.formBody}>
              <form onSubmit={(e) => { submitStaffForm(e) }}>
                <div className={patientStyles.cardBodyPatient}>
                  <div>
                    <InputGroup horizontal>
                      <Label>Title</Label>
                      <Select
                        onChange={handleInputChange}
                        name="title"
                        required
                        value={staffInput.title}
                      >
                        <option value="">Select a title</option>
                        <option value="Dr">Dr</option>
                        <option value="Prof">Prof</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                      </Select>
                    </InputGroup>
                    <InputGroup horizontal>
                      <Label>First Name</Label>
                      <Input
                        autoComplete="true"
                        handleInputChange={handleInputChange}
                        name="firstName"
                        required
                        type="text"
                        validation={InputValidationTypes.text}
                        value={staffInput.firstName}
                      />
                    </InputGroup>
                    <InputGroup horizontal>
                      <Label>Last Name</Label>
                      <Input
                        autoComplete="true"
                        handleInputChange={handleInputChange}
                        name="lastName"
                        required
                        type="text"
                        validation={InputValidationTypes.text}
                        value={staffInput.lastName}
                      />
                    </InputGroup>
                    <InputGroup horizontal>
                      <Label>Gender</Label>
                      <Select
                        onChange={handleInputChange}
                        name="gender"
                        required
                        value={staffInput.gender}
                      >
                        <option value="">Select a gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Select>
                    </InputGroup>
                    <InputGroup horizontal>
                      <Label>Email</Label>
                      <Input
                        autoComplete="true"
                        handleInputChange={handleInputChange}
                        name="email"
                        required
                        type="email"
                        validation={InputValidationTypes.email}
                        value={staffInput.email}
                      />
                    </InputGroup>
                    <InputGroup horizontal>
                      <Label>Password</Label>
                      <Input
                        autoComplete="true"
                        handleInputChange={handleInputChange}
                        name="password"
                        required
                        type="password"
                        validation={InputValidationTypes.freeText}
                        value={staffInput.password}
                      />
                    </InputGroup>
                    <InputGroup horizontal>
                      <Label>Phone No:</Label>
                      <Input
                        autoComplete="true"
                        handleInputChange={handleInputChange}
                        name="phoneNumber"
                        required
                        type="text"
                        validation={InputValidationTypes.tel}
                        value={staffInput.phoneNumber}
                      />
                    </InputGroup>
                    <InputGroup horizontal>
                      <Label>role</Label>
                      <Select
                        onChange={handleInputChange}
                        name="role"
                        required
                        value={staffInput.role}
                      >
                        <option value="">Select a role</option>
                        {
                          role.length > 0 && role.map(role => <option key={role.id} value={role.name}>{role.name}</option>)
                        }

                      </Select>
                    </InputGroup>
                  </div>
                  <div style={{ margin: '0 auto' }}>
                    <div className={patientStyles.PhotoBox}>
                      <div>
                        {
                          staffInput.imageUrl !== '' ?
                            <img src={staffInput.imageUrl} alt="patient photo" /> :
                            <img src={require('../../assets/images/figure.png')} alt="patient photo" />

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
                    </div>
                    {
                      //  @ts-ignore
                    fileInput?.current?.files.length > 0 &&
                      <ProgressBar key={0} bgcolor="#1E638F" completed={percentage} />
                    }
                  </div>
                  <FormErrors errors={error} />
                  {/* <FormMessages messages={response} /> */}
                  <div className={styles.button}>
                    <Button htmlType="submit" loading={loading}>Continue</Button> <Button href="/app/dashboard">Cancel</Button>
                  </div>
                </div>
              </form>
            </div>
            <Modal
              visible={showModal}
              title="New Staff Added"
              subtitle="New Staff has been added successfully"
              closeModal={() => { setShowModal(false) }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
