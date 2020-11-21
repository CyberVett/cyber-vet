import React, { FormEvent, useContext, useState, useEffect } from 'react';
import { CheckboxInput, FormErrors, FormMessages, Input, InputGroup, Label, Select, TextArea } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from './appointment.module.scss';
import Button, { ButtonTypes } from 'components/Button/button';
import SectionHeader from 'components/SectionHeader/sectionHeader';
import { AuthContext } from 'contexts/auth';
import requestClient from 'lib/requestClient';
import { formatDate, formatDateForCalendar } from 'lib/utils';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  patientNo: string;
  modalData?: any;
  isReview?: boolean;
}

const AppointmentModal: React.FC<IModalProps> = ({ visible, closeModal, patientNo, modalData, isReview }) => {
  // @ts-ignore
  const { user } = useContext(AuthContext);
  const [appointment, setAppointment] = useState({
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

  useEffect(() => {
    setAppointment(modalData);
  }, [modalData]);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    requestClient.post(`patients/${patientNo}/appointment`, {
      "allDay": appointment.allDay,
      // @ts-ignore
      "appointmentDate": formatDate(appointment.appointmentDate),
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
    console.log(appointment);
    
    requestClient.put(`patients/${patientNo}/appointment`, {
      "allDay": appointment.allDay,
      // @ts-ignore
      "appointmentDate": formatDate(appointment.appointmentDate),
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
          <div className={styles.dateTime}>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Date</Label>
              <Input
                className={styles.width500}
                autoComplete="true"
                name="appointmentDate"
                onChange={handleInputChange}
                required
                type="date"
                // @ts-ignore
                value={modalData ? formatDateForCalendar(appointment?.appointmentDate) : appointment?.appointmentDate}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>All Day</Label>
              <CheckboxInput
                checked={appointment?.allDay}
                name="allDay"
                onChange={handleInputChange}
                value="allDay"
              />
            </InputGroup>
          </div>
          {/* TODO: possible fix later one */}
          <InputGroup className={styles.spaceBetween} horizontal>
            <Label>Scheduled By</Label>
            <Input
            className={styles.width500}
              disabled
              name="reason"
              onChange={handleInputChange}
              required
              type="text"
              value={`${user?.info?.staff?.title} ${user?.info?.staff?.firstName} ${user?.info?.staff?.lastName}`}
            />
          </InputGroup>
          <InputGroup className={styles.spaceBetween} horizontal>
            <Label>Reason</Label>
            <Select
            className={styles.width500}
              name="reason"
              onChange={handleInputChange}
              required
              value={appointment?.reason}
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
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Enter Other Reasons</Label>
              <Input
              className={styles.width500}
                handleInputChange={handleInputChange}
                name="otherSpecie"
                required
                type="text"
                value={appointment.otherReason}
              />
            </InputGroup>}
          <InputGroup className={styles.spaceBetween} horizontal>
            <Label>Status</Label>
            <Select
            className={styles.width500}
              name="status"
              onChange={handleInputChange}
              required
              value={appointment?.status}
            >
              <option value="">Select a status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Attended">Attended</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </InputGroup>
          <InputGroup className={styles.spaceBetween} horizontal>
            <Label>Notes</Label>
            <TextArea
            className={styles.width500}
              name="notes"
              onChange={handleInputChange}
              required
              value={appointment?.notes}
            />
          </InputGroup>
          <div className={styles.reminder}>
          <InputGroup className={styles.spaceBetween} horizontal>
            <Label>email reminder</Label>
            <CheckboxInput
              checked={appointment?.emailReminder}
              name="emailReminder"
              onChange={handleInputChange}
              value="emailReminder"
            />
          </InputGroup>
          <InputGroup className={styles.spaceBetween} horizontal>
            <Label>sms reminder</Label>
            <CheckboxInput
              checked={appointment?.smsReminder}
              name="smsReminder"
              onChange={handleInputChange}
              value="smsReminder"
            />
          </InputGroup>
          </div>
        </div>
        <FormErrors errors={error} />
        <FormMessages messages={messages} />
        <div className={styles.buttonContainer}>
          <Button type={ButtonTypes.primary} htmlType="submit" loading={loading}>{isReview ? 'Update Appointment' : 'Add Appointment'}</Button>
          <Button type={ButtonTypes.grey} onClick={closeModal}>Cancel</Button>
        </div>
      </form>
    </Modal>
  )
}

export default AppointmentModal;