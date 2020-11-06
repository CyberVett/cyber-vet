import React from 'react';
import { CheckboxInput, Input, InputGroup, Label, TextArea } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from './appointment.module.scss';
import Button from 'components/Button/button';
import SectionHeader from 'components/SectionHeader/sectionHeader';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
}

const AppointmentModal: React.FC<IModalProps> = ({ visible, closeModal }) => {

  return (
    <Modal
      closeModal={closeModal}
      fullMode
      noTitle
      visible={visible}>
      <SectionHeader title="New Appointment" >
        <span>Patient No: SAC01/16/08/2020</span>
      </SectionHeader>
      <div className={styles.formDetailsInput}>
        <InputGroup horizontal>
          <Label>Notes</Label>
          <TextArea />
        </InputGroup>

        <div>
        <InputGroup horizontal>
          <Label>Date</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Scheduled By</Label>
          <Input disabled />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Reason</Label>
          <Input />
        </InputGroup>
        <InputGroup horizontal>
          <Label>Status</Label>
          <Input />
        </InputGroup>
          <InputGroup horizontal>
            <Label>email reminder</Label>
            <CheckboxInput />
          </InputGroup>
          <InputGroup horizontal>
            <Label>sms reminder</Label>
            <CheckboxInput />
          </InputGroup>
        </div>
        <div>
          <Button>Add Appointment</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    </Modal>
  )
}

export default AppointmentModal;