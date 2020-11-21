import React, { useEffect, useState } from 'react';
import { FormErrors, FormMessages, Input, InputGroup, Label, TextArea } from 'components/Input/input';
import Modal from 'components/Modal/modal';

import styles from './radiology.module.scss';
import Button, { ButtonTypes } from 'components/Button/button';
import requestClient from 'lib/requestClient';

export interface IModalProps {
  visible: boolean;
  closeModal: () => void;
  checkInData?: any;
  patientNo: string;
  checkInID: string;
  disabled?: boolean;
}

const RadiologyModal: React.FC<IModalProps> = ({ visible, closeModal, checkInData, patientNo, checkInID, disabled }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessage] = useState('');
  const [radiologyInput, setRadiologyInput] = useState({
    provisionalDiagnosis: '',
    clinicalNotes: '',
    examinationRequired: '',
    XRayRoomNo: '',
    KV: '',
    MA: '',
    secs: '',
    MAS: '',
    MCHC: '',
    shortRemarks: '',
    contrastInjectedType: '',
    contrastInjectedVolume: '',
    contrastInjectedRate: '',
    reaction: '',
    remarks: '',
    report: '',
  });

  console.log("id", checkInID);
  console.log("pd", patientNo);
  console.log("d", checkInData);


  const handleInputChange = (event: { persist: () => void; target: { name: any; value: any; type: any; checked?: boolean; } }) => {
    event.persist();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setRadiologyInput((input: any) => ({
      ...input,
      [event.target.name]: value
    }));
  };

  useEffect(() => {
    setRadiologyInput(checkInData);
  }, [checkInData]);

  const addRadiology = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    requestClient.post(`/laboratory/radiology/add`, {
      "checkinId": checkInID,
      "patientId": patientNo,
      "provisionalDiagnosis": radiologyInput.provisionalDiagnosis,
      "clinicalNotes": radiologyInput.clinicalNotes,
      "examinationRequired": radiologyInput.examinationRequired,
      "XRayRoomNo": radiologyInput.XRayRoomNo,
      "KV": radiologyInput.KV,
      "MA": radiologyInput.MA,
      "shortRemarks": radiologyInput.shortRemarks,
      "secs": radiologyInput.secs,
      "MAS": radiologyInput.MAS,
      "MCHC": radiologyInput.MCHC,
      "contrastInjectedType": radiologyInput.contrastInjectedType,
      "contrastInjectedVolume": radiologyInput.contrastInjectedVolume,
      "contrastInjectedRate": radiologyInput.contrastInjectedRate,
      "reaction": radiologyInput.reaction,
      "remarks": radiologyInput.remarks,
      "report": radiologyInput.report
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
        }, 3000)
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message)
      })
  };

  const completeRadiology = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    requestClient.put(`/laboratory/radiology/complete`, {
      "checkinId": checkInID,
      "patientId": patientNo,
      "provisionalDiagnosis": radiologyInput.provisionalDiagnosis,
      "clinicalNotes": radiologyInput.clinicalNotes,
      "examinationRequired": radiologyInput.examinationRequired,
      "XRayRoomNo": radiologyInput.XRayRoomNo,
      "KV": radiologyInput.KV,
      "MA": radiologyInput.MA,
      "secs": radiologyInput.secs,
      "shortRemarks": radiologyInput.shortRemarks,
      "MAS": radiologyInput.MAS,
      "MCHC": radiologyInput.MCHC,
      "contrastInjectedType": radiologyInput.contrastInjectedType,
      "contrastInjectedVolume": radiologyInput.contrastInjectedVolume,
      "contrastInjectedRate": radiologyInput.contrastInjectedRate,
      "reaction": radiologyInput.reaction,
      "remarks": radiologyInput.remarks,
      "report": radiologyInput.report
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
        <InputGroup className={styles.spaceBetween} horizontal>
          <Label>Clinical Notes</Label>
          <TextArea
            className={styles.width500}
            disabled={disabled}
            name="clinicalNotes"
            onChange={handleInputChange}>
            {radiologyInput?.clinicalNotes}
          </TextArea>
        </InputGroup>
        <InputGroup className={styles.spaceBetween} horizontal>
          <Label>Provisional Diagnosis</Label>
          <Input
            className={styles.width500}
            disabled={disabled}
            name="provisionalDiagnosis"
            onChange={handleInputChange}
            type="text"
            value={radiologyInput?.provisionalDiagnosis}
          />
        </InputGroup>
        <InputGroup className={styles.spaceBetween} horizontal>
          <Label>Examination Required</Label>
          <Input
            className={styles.width500}
            disabled={disabled}
            name="examinationRequired"
            onChange={handleInputChange}
            type="text"
            value={radiologyInput?.examinationRequired}
          />
        </InputGroup>
        <div className={styles.formDetailsGrid}>
          <div>
            <h4>Radiographer&apos;s note</h4>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>X-Ray Room No</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="XRayRoomNo"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.XRayRoomNo}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>kv</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="KV"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.KV}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>ma</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="MA"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.MA}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>secs</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="secs"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.secs}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>mas</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="MAS"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.MAS}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>MCHC (g/l)</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="MCHC"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.MCHC}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Remarks</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="shortRemarks"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.shortRemarks}
              />
            </InputGroup>
            <h4>CONTRAST INJECTED</h4>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Type</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="contrastInjectedType"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.contrastInjectedType}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Volume</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="contrastInjectedVolume"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.contrastInjectedVolume}
              />
            </InputGroup>
            <InputGroup className={styles.spaceBetween} horizontal>
              <Label>Rate</Label>
              <Input
                className={styles.width250}
                disabled={disabled}
                name="contrastInjectedRate"
                onChange={handleInputChange}
                type="text"
                value={radiologyInput?.contrastInjectedRate}
              />
            </InputGroup>
            <h4>Reaction</h4>
            <div className={styles.formDetailsGrid}>
              <div>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>NIL</Label>
                  <input
                    className={styles.width250}
                    disabled={disabled}
                    type="radio"
                    value="Nil"
                    checked={radiologyInput?.reaction === "Nil"}
                    defaultChecked={radiologyInput?.reaction === "Nil"}
                    onChange={handleInputChange}
                    name="reaction"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>moderate</Label>
                  <input
                    className={styles.width250}
                    disabled={disabled}
                    type="radio"
                    value="Moderate"
                    checked={radiologyInput?.reaction === "Moderate"}
                    defaultChecked={radiologyInput?.reaction === "Moderate"}
                    onChange={handleInputChange}
                    name="reaction"
                  />
                </InputGroup>
              </div>
              <div>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>mild</Label>
                  <input
                    className={styles.width250}
                    disabled={disabled}
                    type="radio"
                    value="Mild"
                    checked={radiologyInput?.reaction === "Mild"}
                    defaultChecked={radiologyInput?.reaction === "Mild"}
                    onChange={handleInputChange}
                    name="reaction"
                  />
                </InputGroup>
                <InputGroup className={styles.spaceBetween} horizontal>
                  <Label>severe</Label>
                  <input
                    className={styles.width250}
                    disabled={disabled}
                    type="radio"
                    value="Severe"
                    checked={radiologyInput?.reaction === "Severe"}
                    defaultChecked={radiologyInput?.reaction === "Severe"}
                    onChange={handleInputChange}
                    name="reaction"
                  />
                </InputGroup>
              </div>
            </div>
          </div>
          <div>
            <h4>Radiologist&apos;s Report</h4>
            <InputGroup className={styles.spaceBetween} horizontal>
              <TextArea cols={20} rows={40}
                // className={styles.width250}
                disabled={disabled}
                name="report"
                onChange={handleInputChange}
                // @ts-ignore
                type="text"
                // @ts-ignore
                value={radiologyInput?.report}
              />
            </InputGroup>
          </div>
        </div>
        <br />
        <br />
        <InputGroup className={styles.spaceBetween} horizontal>
          <Label>Remarks</Label>
          <Input
            className={styles.width500}
            disabled={disabled}
            name="remarks"
            onChange={handleInputChange}
            type="text"
            value={radiologyInput?.remarks}
          />
        </InputGroup>
        <FormErrors errors={error} />
        <FormMessages messages={messages} />
      </div>
      <div className={styles.buttonContainer}>
        {!checkInData && <Button type={ButtonTypes.primary} loading={loading} onClick={(e) => addRadiology(e)}>Add</Button>}
        <Button type={ButtonTypes.orange} loading={loading} onClick={(e) => completeRadiology(e)}>Complete</Button>
        <Button type={ButtonTypes.grey} onClick={closeModal}>Cancel</Button>
      </div>
    </Modal>
  )
}

export default RadiologyModal;