import React from 'react';

import { Input, InputGroup, Label } from 'components/Input/input';
import Card, { CardHeader, CardTabs } from 'components/Card/card';
import { PatientTabs } from 'config/constants';
import Button from 'components/Button/button';

import styles from './patient.module.scss';

const Dashboard: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Input />
        </div>
        <div>
          <Card>
            <CardHeader>Add new patients</CardHeader>
            <CardTabs items={PatientTabs} />
            <InputGroup horizontal>
              <Label>Title</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>First Name</Label>
              <Input />
            </InputGroup >
            <InputGroup horizontal>
              <Label>Last Name</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Address</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Phone No:</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Email</Label>
              <Input />
            </InputGroup>
            <Button>Continue</Button> <Button>Cancel</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
