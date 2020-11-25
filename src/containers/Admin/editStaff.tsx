import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import { FormErrors, Input, InputGroup, InputValidationTypes, Label, Select } from 'components/Input/input';
import SectionHeader from 'components/SectionHeader/sectionHeader';
import Card from 'components/Card/card';
import Button, { ButtonTypes } from 'components/Button/button';
import ProgressBar from 'components/ProgressBar/progressBar';
import requestClient from 'lib/requestClient';
import Modal from 'components/Modal/modal';

import styles from './admin.module.scss';
import patientStyles from '../Patient/patient.module.scss';
import { NextPage, NextPageContext } from 'next';

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
  accountId: string;
  accessRevoked: boolean;
}

const EditStaff: NextPage<{ staffId: string }> = ({ staffId }) => {
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
    imageUrl: '',
    accountId: '',
    accessRevoked: false,
  });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<IRole[]>([]);
  const [percentage, setPercentage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
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
    //  @ts-ignore
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
    requestClient.get(`staff/${staffId}`)
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setStaffInput(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        setError(error.response.data.data.message);
      })
  }, []);

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
        setError(error.response.data.data.message);
      })
  }, [])

  const submitStaffForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    requestClient.put(`staff/${staffId}`, {
      "title": staffInput.title,
      "firstName": staffInput.firstName,
      "lastName": staffInput.lastName,
      "otherName": staffInput.otherName,
      "gender": staffInput.gender,
      "phoneNumber": staffInput.phoneNumber
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setResponse('Staff has been successfully updated');
          setShowModal(true);
          setTimeout(() => {
            Router.push({
              pathname: '/app/admin',
            });
          }, 3000);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message);
      })
  };

  const removeStaff = () => {
    setLoading(true);
    requestClient.delete(`staff/${staffId}`)
      .then(response => {        
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setResponse('Staff has been successfully removed');
          setShowModal(true);
          setTimeout(() => {
            Router.push({
              pathname: '/app/admin',
            });
          }, 3000);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.data.message);
      })
  }

   const revokeStaff = () => {
    setLoading(true);
    requestClient.put(`staff/revoke-access/${staffId}`)
      .then(response => {        
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setResponse('Staff has been successfully revoked');
          setShowModal(true);
          setTimeout(() => {
            Router.push({
              pathname: '/app/admin',
            });
          }, 3000);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.data.message);
      })
  }

  const grantAccess = () => {
    setLoading(true);
    requestClient.put(`staff/grant-access/${staffId}`)
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setResponse('Staff has been successfully restored');
          setShowModal(true);
          setTimeout(() => {
            Router.push({
              pathname: '/app/admin',
            });
          }, 3000);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.data.message);
      })
  }

  return (
    <div className={styles.container}>
      <div>
        <div>
          <Card>
            <SectionHeader title="Edit Staff" ><Button onClick={staffInput.accessRevoked ? grantAccess : revokeStaff} type={staffInput.accessRevoked ? ButtonTypes.primary : ButtonTypes.orange}>{staffInput.accessRevoked ? 'Restore Access' : 'Revoke Access'}</Button></SectionHeader>
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
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
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
                        value={staffInput.accountId}
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
                        name="role"
                        onChange={handleInputChange}
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
                    <Button htmlType="submit" loading={loading}type={ButtonTypes.primary} >Continue</Button> <Button onClick={removeStaff} type={ButtonTypes.red} >Remove Staff</Button>
                  </div>
                </div>
              </form>
            </div>
            <Modal
              visible={showModal}
              title="Staff Details Updated"
              subtitle={response}
              closeModal={() => { 
                setShowModal(false)
                Router.push({
                  pathname: '/app/admin',
                });
               }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

EditStaff.getInitialProps = async ({ query }: NextPageContext) => {
  const staffId = (query && query.staffId) as string;
  return {
    staffId
  }
}

export default EditStaff;
