import React, { FormEvent, useContext, useState } from 'react';
import { CheckboxInput, FormErrors, FormMessages, Input, InputGroup, Label, Select, TextArea } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from './appointment.module.scss';
import Button from 'components/Button/button';
import SectionHeader from 'components/SectionHeader/sectionHeader';
import { IAppointmentInput } from 'types/user';
import { AuthContext } from 'contexts/auth';
import requestClient from 'lib/requestClient';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  patientNo: string;
  modalData?: any;
  isReview?: boolean;
}

const AppointmentModal: React.FC<IModalProps> = ({ visible, closeModal, patientNo, modalData, isReview }) => {
  // @ts-ignore
  const { user: { info} } = useContext(AuthContext);
  const [appointment, setAppointment] = useState<IAppointmentInput>(modalData ?? {
    allDay: false,
    appointmentDate: '',
    emailReminder: false,
    notes: '',
    otherReason: '',
    reason: '',
    smsReminder: false,
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessage] = useState('');

  const handleInputChange = (event: { persist: () => void; target: { name: any; value: any; type: any; checked?: boolean; } }) => {
    event.persist();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setAppointment((input: any) => ({
      ...input,
      [event.target.name]: value
    }));
  };
console.log('here',appointment);
console.log('mode',modalData);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    requestClient.post(`patients/${patientNo}/appointment`, {
      "allDay": appointment.allDay,
      "appointmentDate": appointment.appointmentDate,
      "emailReminder": appointment.emailReminder,
      "notes": appointment.notes,
      "reason": appointment.reason  === "Others" ? appointment.otherReason : appointment.reason,
      "smsReminder": appointment.smsReminder,
      "status": appointment.status,
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setMessage(response.data.message);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
        setTimeout(()=>{
          closeModal();
        }, 3000)
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message)
      })
  };

  const updateForm = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    requestClient.put(`patients/${patientNo}/appointment`, {
      "allDay": appointment.allDay,
      "appointmentDate": appointment.appointmentDate,
      "emailReminder": appointment.emailReminder,
      "notes": appointment.notes,
      "reason": appointment.reason  === "Others" ? appointment.otherReason : appointment.reason,
      "smsReminder": appointment.smsReminder,
      "status": appointment.status,
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setMessage(response.data.message);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
        setTimeout(()=>{
          closeModal();
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message)
      })
  }

  const handleSubmit = (e: FormEvent) => {
    if(isReview) {
      updateForm(e);
    } else {
      submitForm(e);
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      fullMode
      noTitle
      visible={visible}>
      <SectionHeader title="New Appointment" >
        <span>{`Patient No: ${patientNo}`}</span>
      </SectionHeader>
      <form
        className={styles.formDetailsInput}
        onSubmit={(e:FormEvent) => handleSubmit(e)}>
        <div>
          <div>
            <InputGroup horizontal>
              <Label>Date</Label>
              <Input
                autoComplete="true"
                name="appointmentDate"
                onChange={handleInputChange}
                required
                type="date"
                value={modalData?.appointmentDate ?? appointment?.appointmentDate}
              />
            </InputGroup>
            <InputGroup horizontal>
              <Label>All Day</Label>
              <CheckboxInput
                checked={modalData?.allDay ?? appointment?.allDay}
                name="allDay"
                onChange={handleInputChange}
                value="allDay"
              />
            </InputGroup>
          </div>
          <InputGroup horizontal>
            <Label>Scheduled By</Label>
            <Input
              disabled
              name="reason"
              onChange={handleInputChange}
              required
              type="text"
              value={`${info?.staff?.title} ${info?.staff?.firstName} ${info?.staff?.lastName}`}
            />
          </InputGroup>
          <InputGroup horizontal>
            <Label>Reason</Label>
            <Select
              name="reason"
              onChange={handleInputChange}
              required
              value={modalData?.reason ?? appointment?.reason}
            >
              <option value="">Select a reason</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Follow up">Follow up</option>
              <option value="Surgery">Surgery</option>
              <option value="Check up">Check  up</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Radiology">Radiology</option>
              <option value="Ultrasound">Ultrasound</option>
              <option value="Deworming">Deworming</option>
              <option value="Tick Bath">Tick Bath</option>
              <option value="Others">Others</option>
            </Select>
          </InputGroup>
          {appointment?.reason === 'Others' &&
            <InputGroup horizontal>
              <Label>Enter Other Reasons</Label>
              <Input
                handleInputChange={handleInputChange}
                name="otherSpecie"
                required
                type="text"
                value={appointment.otherReason}
              />
            </InputGroup>}
          <InputGroup horizontal>
            <Label>Status</Label>
            <Select
              name="status"
              onChange={handleInputChange}
              required
              value={modalData?.status ?? appointment?.status}
            >
              <option value="">Select a status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Attended">Attended</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </InputGroup>
          <InputGroup horizontal>
            <Label>Notes</Label>
            <TextArea
              name="notes"
              onChange={handleInputChange}
              required
              value={modalData?.notes ?? appointment?.notes}
            />
          </InputGroup>
          <InputGroup horizontal>
            <Label>email reminder</Label>
            <CheckboxInput
              checked={modalData?.emailReminder ?? appointment?.emailReminder}
              name="emailReminder"
              onChange={handleInputChange}
              value="emailReminder"
            />
          </InputGroup>
          <InputGroup horizontal>
            <Label>sms reminder</Label>
            <CheckboxInput
              checked={modalData?.smsReminder ?? appointment?.smsReminder}
              name="smsReminder"
              onChange={handleInputChange}
              value="smsReminder"
            />
          </InputGroup>
        </div>
        <FormErrors errors={error} />
        <FormMessages messages={messages} />
        <div>
          <Button htmlType="submit" loading={loading}>{isReview ? 'Update Appointment' : 'Add Appointment'}</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </div>
      </form>
    </Modal>
  )
}

export default AppointmentModal;