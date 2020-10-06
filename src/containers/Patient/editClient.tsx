import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import { FormErrors, FormMessages, Input, InputGroup, InputValidationTypes, Label, Select } from 'components/Input/input';
import Card, { CardHeader } from 'components/Card/card';
import Button from 'components/Button/button';

import requestClient from 'lib/requestClient';
import styles from './patient.module.scss';
import { NextPage, NextPageContext } from 'next';

interface IEditClient {
  title: string;
  firstName: string;
  lastName: string;
  otherName: string;
  gender: string;
  email: string;
  address: string;
  phoneNumber: string;
}

const EditClient: NextPage<{ clientId: string }> = (clientId) => {

  const [clientInput, setClientInput] = useState<IEditClient>({
    title: '',
    firstName: '',
    lastName: '',
    otherName: 'empty',
    gender: '',
    email: '',
    address: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
    event.persist();
    setClientInput((input: any) => ({
      ...input,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    setLoading(true);    
    requestClient.get(`clients/${clientId.clientId}`)
      .then(response => {        
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setClientInput(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        setError(error.response.data.message);
      })
  }, []);

  const submitClientForm = (e: any) => {
    e.preventDefault();
    setLoading(true);
    requestClient.put(`clients/${clientId.clientId}`, {
      "title": clientInput.title,
      "firstName": clientInput.firstName,
      "lastName": clientInput.lastName,
      "otherName": clientInput.otherName,
      "gender": clientInput.gender,
      "email": clientInput.email,
      "address": clientInput.address,
      "phoneNumber": clientInput.phoneNumber
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setResponse(response.data.message);
          setTimeout(() => {
            Router.push({
              pathname: '/app/client',
            });
          }, 2000);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message);
        console.log('error', error.response);
      })
  };

  return (
    <div className={styles.container}>
      <div>
        <div>
          <Card>
            <CardHeader>Edit Client</CardHeader>
            <div className={styles.cardBody}>
              <form onSubmit={(e) => { submitClientForm(e) }}>
                <InputGroup horizontal>
                  <Label>Title</Label>
                  <Select
                    onChange={handleInputChange}
                    name="title"
                    required
                    value={clientInput.title}
                  >
                    <option value="">Select a title</option>
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
                    value={clientInput.firstName}
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
                    value={clientInput.lastName}
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Gender</Label>
                  <Select
                    onChange={handleInputChange}
                    name="gender"
                    required
                    value={clientInput.gender}
                  >
                    <option value="">Select a gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Address</Label>
                  <Input
                    autoComplete="true"
                    handleInputChange={handleInputChange}
                    name="address"
                    required
                    type="address"
                    validation={InputValidationTypes.alphanumeric}
                    value={clientInput.address}
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
                    value={clientInput.phoneNumber}
                  />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Email</Label>
                  <Input
                    autoComplete="true"
                    handleInputChange={handleInputChange}
                    name="email"
                    type="email"
                    validation={InputValidationTypes.email}
                    value={clientInput.email}
                  />
                </InputGroup>
                <FormErrors errors={error} />
                <FormMessages messages={response} />
                <div className={styles.button}>
                  <Button htmlType="submit" loading={loading}>Continue</Button> <Button href="/app/dashboard">Cancel</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

EditClient.getInitialProps = async ({ query }: NextPageContext) => {
  const clientId = (query && query.clientId) as string;  
  return {
    clientId
  }
}

export default EditClient;
