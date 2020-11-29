import React, { FormEvent, useState, useEffect } from 'react';
import { FormErrors, FormMessages, Input, InputGroup, InputValidationTypes, Label, Select } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from './billing.module.scss';
import Button, { ButtonTypes } from 'components/Button/button';
import SectionHeader from 'components/SectionHeader/sectionHeader';
import requestClient from 'lib/requestClient';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  billingId?: string;
  modalData?: any;
  isReview?: boolean;
}

interface IBilling {
  charges: string;
  currency: string;
  department: string;
  name: string;
}

interface IDepartment {
  id: string;
  name: string;
}

const BillingModal: React.FC<IModalProps> = ({ visible, closeModal, billingId, modalData, isReview }) => {
  const [billingInput, setBillingInput] = useState<IBilling>({
    charges: '',
    currency: '',
    department: '',
    name: '',
  });

  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState<IDepartment[]>();
  const [error, setError] = useState('');
  const [messages, setMessage] = useState('');

  const handleInputChange = (event: { persist: () => void; target: { name: any; value: any; type: any; checked?: boolean; } }) => {
    event.persist();
    setBillingInput((input: any) => ({
      ...input,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    setBillingInput(modalData);
  }, [modalData]);

  console.log(modalData);


  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    requestClient.post(`/billings/services`, {
      "billingDepartmentId": billingInput.department,
      "charges": billingInput.charges,
      "currency": billingInput.currency,
      "name": billingInput.name,
    })
      .then(response => {
        console.log(response);

        setLoading(false);
        if (response.status === 201 && response.statusText === 'Created') {
          setMessage(response.data.message);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
        setTimeout(() => {
          closeModal();
        }, 1500)
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message)
      })
  };

  const updateForm = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    requestClient.put(`/billings/services/${billingId}`, {
      "billingDepartmentId": billingInput.department,
      "charges": billingInput.charges,
      "currency": billingInput.currency,
      "name": billingInput.name,
    })
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setMessage(response.data.message);
        } else {
          setLoading(false);
          setError(response.data.message);
        }
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message)
      })
  }

  const fetchDepartments = () => {
    requestClient.get('/billings/departments')
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setDepartment(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }
  const handleSubmit = (e: FormEvent) => {
    if (isReview) {
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
      <SectionHeader title={isReview ? "Edit Service" : "Add New Service"} />
      <form
        className={styles.formDetailsInput}
        onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <InputGroup className={styles.spaceBetween} horizontal>
          <Label>Department</Label>
          <Select
            className={styles.width500}
            name="department"
            onChange={handleInputChange}
            required
            // @ts-ignore
            value={isReview ? billingInput?.department?.id : billingInput?.department}
          >
            <option value="">Select a department</option>
            {
              department?.map(({ name, id }, index) => <option key={index} value={id}>{name}</option>)
            }
          </Select>
        </InputGroup>
        <InputGroup className={styles.spaceBetween} horizontal>
          <Label>Services</Label>
          <Input
            className={styles.width500}
            name="name"
            onChange={handleInputChange}
            required
            type="text"
            value={billingInput?.name}
          />
        </InputGroup>
        <InputGroup className={styles.spaceBetween} horizontal>
          <Label>Charges</Label>
          <Input
            className={styles.width500}
            name="charges"
            onChange={handleInputChange}
            required
            type="number"
            validation={InputValidationTypes.alphanumeric}
            value={billingInput?.charges}
          />
        </InputGroup>
        <InputGroup className={styles.spaceBetween} horizontal>
          <Label>Currency</Label>
          <Select
            className={styles.width500}
            name="currency"
            onChange={handleInputChange}
            required
            value={billingInput?.currency}
          >
            <option value="">Select a currency</option>
            <option value="NGN">Naira</option>
          </Select>
        </InputGroup>
        <FormErrors errors={error} />
        <FormMessages messages={messages} />
        <div className={styles.buttonContainer}>
          <Button type={ButtonTypes.primary} htmlType="submit" loading={loading}>{isReview ? 'Update Billing' : 'Add Billing'}</Button>
          <Button type={ButtonTypes.grey} onClick={closeModal}>Cancel</Button>
        </div>
      </form>
    </Modal>
  )
}

export default BillingModal;