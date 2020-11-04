import React from 'react';
import { Input, InputGroup, Label, TextArea } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from '../laboratory.module.scss';
import Button from 'components/Button/button';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
}

const RapidTestModal: React.FC<IModalProps> = ({ visible, closeModal }) => {

  return (
    <Modal
      closeModal={closeModal}
      fullMode
      noTitle
      visible={visible}>
      <div className={styles.formMenu}>
        <h3>Rapid Test Kit</h3>
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
          <Label>Type of Specimen</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Clinical Details</Label>
          <TextArea />
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

export default RapidTestModal;