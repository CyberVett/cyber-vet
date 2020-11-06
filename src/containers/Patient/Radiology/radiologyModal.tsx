import React from 'react';
import { CheckboxInput, Input, InputGroup, Label, TextArea } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from './radiology.module.scss';
import Button from 'components/Button/button';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
}

const RadiologyModal: React.FC<IModalProps> = ({ visible, closeModal }) => {

  return (
    <Modal
      closeModal={closeModal}
      fullMode
      noTitle
      visible={visible}>
      <div className={styles.formMenu}>
        <h3>Radiology Form</h3>
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
          <Label>Clinical Notes</Label>
          <TextArea />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Provisional Diagnosis</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Examination Required</Label>
          <Input />
        </InputGroup>
        <div className={styles.formDetailsGrid}>
          <div>
            <h4>Radiographer&apos;s note</h4>
            <InputGroup horizontal>
              <Label>X-Ray Room No</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>kv</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>ma</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>secs</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>mas</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>MCHC (g/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Remarks</Label>
              <Input />
            </InputGroup>
            <h4>CONTRAST INJECTED</h4>
            <InputGroup horizontal>
              <Label>Type</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Volume</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Rate</Label>
              <Input />
            </InputGroup>
            <h4>Reaction</h4>
            <div className={styles.formDetailsGrid}>
              <div>
                <InputGroup horizontal>
                  <Label>NIL</Label>
                  <CheckboxInput />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>moderate</Label>
                  <CheckboxInput />
                </InputGroup>
              </div>
              <div>
                <InputGroup horizontal>
                  <Label>mild</Label>
                  <CheckboxInput />
                </InputGroup>
                <InputGroup horizontal>
                  <Label>severe</Label>
                  <CheckboxInput />
                </InputGroup>
              </div>
            </div>
          </div>
          <div>
            <h4>Radiologist&apos;s Report</h4>
            <InputGroup horizontal>
              <TextArea cols={20} rows={40} />
            </InputGroup>
          </div>
        </div>
        <br />
        <br />
        <InputGroup horizontal>
          <Label>Remarks</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Name of Radiologist</Label>
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

export default RadiologyModal;