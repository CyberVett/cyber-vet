import React from 'react';

import { Input, InputGroup, Label } from 'components/Input/input';
import SectionHeader, { SubSectionHeader } from 'components/SectionHeader/sectionHeader';
import Card, { CardTabs } from 'components/Card/card';
import { BoardingTabs } from 'config/constants';
import Button from 'components/Button/button';

import styles from './boarding.module.scss';

const AddPatient: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Card>
            <CardTabs items={BoardingTabs} />
            <SectionHeader title="Add New Patient" />
            <SubSectionHeader title="Signalment" />
            <div className={styles.cardBodyPatient}>
              <div>
                <InputGroup horizontal>
                  <Label>Patient Name</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Patient Specie</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Breed</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Gender</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Color</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Date of Birth</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Age</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Status</Label>
                  <Input />
                </InputGroup>
              </div>
              <div>

              </div>
            </div>
            <hr />
            <SubSectionHeader title="animal history" />
            <div className={styles.cardBodyPatient}>
              <div>
                <InputGroup horizontal>
                  <Label>Age when acquired</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>source</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Flock/Herd Size</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>Purpose of keeping</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>type of food</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>water source</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>management system</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>vaccination</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>vaccine used</Label>
                  <Input />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>treatment warnings</Label>
                  <Input />
                </InputGroup>
              </div>
            </div>
            <div className={styles.button}>
              <Button>Continue</Button> <Button>Cancel</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
