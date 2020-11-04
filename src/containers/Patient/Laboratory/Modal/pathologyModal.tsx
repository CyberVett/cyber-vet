import React from 'react';
import { Input, InputGroup, Label, TextArea } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from '../laboratory.module.scss';
import Button from 'components/Button/button';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
}

const AddPathologyModal: React.FC<IModalProps> = ({ visible, closeModal }) => {

  return (
    <Modal
      closeModal={closeModal}
      fullMode
      noTitle
      visible={visible}>
      <div className={styles.formMenu}>
        <h3>Add Pathology Form</h3>
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
            <h3>HAEMATOLOGY</h3>
            <InputGroup horizontal>
              <Label>rbc (x10<sup>13</sup>/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Haemoglobin (g/dl)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>PCV (&#37;)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>MCV (fl)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>MCH (pg)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>MCHC (g/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>WBC (x10<sup>13</sup>/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Neutrophils (&#37;)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>bands (&#37;)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Lymphocytes (&#37;)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Monocytes (&#37;)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Eosinophils (&#37;)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Platelets (x10<sup>13</sup>/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>MPV (fl)</Label>
              <Input />
            </InputGroup>
          </div>
          <div>
            <h3>SERUM CHEMISTRY</h3>
            <InputGroup horizontal>
              <Label>Total Protein (g/dl)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Total  bilirubin (&micro;mol/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Conjugated bilirubin
(μmol/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Na<sup>+</sup> (μmol/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>K<sup>+</sup> (μmol/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Creatinine (μmol/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>BUN (μmol/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Albumin (g/dl)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Glucose (μmol/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>SGOT/AST (IU/L)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>SGPT/ALT (IUL)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>ALP (IU/L)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Liquid Profile (μmol/l)</Label>
              <Input />
            </InputGroup>
            <InputGroup horizontal>
              <Label>Other Specified</Label>
              <Input />
            </InputGroup>
          </div>
        </div>
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

export default AddPathologyModal;