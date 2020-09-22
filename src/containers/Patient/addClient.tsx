import React from 'react';

import { Input, InputGroup, Label } from 'components/Input/input';
import SectionHeader from 'components/SectionHeader/sectionHeader';
import Card, { CardTabs } from 'components/Card/card';
import { PatientTabs } from 'config/constants';
import Button from 'components/Button/button';

import styles from './patient.module.scss';

const AddClient: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Card>
            <CardTabs items={PatientTabs} />
            <SectionHeader title="Add New Client" />
            <div className={styles.cardBody}>
              <InputGroup horizontal>
                <Label>Title</Label>
                <Input />
              </InputGroup>
              <InputGroup horizontal>
                <Label>First Name</Label>
                <Input />
              </InputGroup>
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
              <div className={styles.button}>
                <Button>Continue</Button> <Button>Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
