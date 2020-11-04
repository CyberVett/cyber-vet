import React from 'react';
import { CheckboxInput, Input, InputGroup, Label, TextArea } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from '../laboratory.module.scss';
import Button from 'components/Button/button';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
}

const ParasitologyModal: React.FC<IModalProps> = ({ visible, closeModal }) => {

  return (
    <Modal
      closeModal={closeModal}
      fullMode
      noTitle
      visible={visible}>
      <div className={styles.formMenu}>
        <h3>Parasitology Form</h3>
        <InputGroup horizontal >
          <Label>Date Requested</Label>
          <input
            disabled
            placeholder={new Date().toLocaleString()} />
        </InputGroup>
        <InputGroup horizontal >
          <Label>Date Completed</Label>
          <input
            disabled
            placeholder={new Date().toLocaleString()} />
        </InputGroup>
      </div>
      <div className={styles.formDetailsInput}>
        <InputGroup horizontal>
          <Label>Case history</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Tentative Diagnosis</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Tentative Diagnosis</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Test(s) Required</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Result(s)</Label>
          <TextArea />
        </InputGroup>
        <div className={styles.formDetailsGrid}>
          <div>
            <h3>Type of Sample Submitted</h3>
            <InputGroup horizontal>
              <Label>Blood</Label>
              <CheckboxInput />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Urine</Label>
              <CheckboxInput />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Stool</Label>
              <CheckboxInput />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Skin scrapping</Label>
              <CheckboxInput />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Other</Label>
              <CheckboxInput />
            </InputGroup>
          </div>
          <div>
            <h3>Condition of Specimen</h3>
            <InputGroup horizontal>
              <Label>Good</Label>
              <CheckboxInput />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Fair</Label>
              <CheckboxInput />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Poor</Label>
              <CheckboxInput />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Other</Label>
              <CheckboxInput />
            </InputGroup>
          </div>
        </div>
        <h4>Test</h4>
        <InputGroup horizontal>
          <Label>Blood</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>PCV (&#37;)</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Wet mount/Blood film/
Haemoparasite</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Skin Scrapping</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Feacal analysis - Egg/
Oocyst/Parasite Count</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Urine Analysis</Label>
          <Input />
        </InputGroup>
        <br />
        <br />
        <InputGroup horizontal>
          <Label>Name of Technologist</Label>
          <Input />
        </InputGroup>
      </div>
      <div>
        <Button>Add</Button>
        <Button>Complete</Button>
        <Button>Cancel</Button>
      </div>
    </Modal>
  )
}

export default ParasitologyModal;