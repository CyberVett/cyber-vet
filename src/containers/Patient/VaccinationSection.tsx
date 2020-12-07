import React, { useEffect } from 'react'
import { formatDate } from 'lib/utils'
import { InputGroup, Label } from 'components/Input/input'

import styles from './Laboratory/laboratory.module.scss';

export const VaccinationSection = ({
  // @ts-ignore
  data, checkInData }) => {

    useEffect(() => {
      checkInData = checkInData;
      data = data;
    }, [data, checkInData]);
    
  return (
    data === null ? <h2 style={{ textAlign: 'center' }}>Add New Vaccination Record</h2> :
      <>
        <div className={styles.formDetails}>
          <div className={styles.formDetailsInfo}>
            <InputGroup>
              <Label>Check In</Label>
              <input disabled placeholder={formatDate(checkInData?.createdAt)} />
            </InputGroup>
            <InputGroup>
              <Label>Visit Type</Label>
              <select>
                <option>Follow up</option>
                <option>First Visit</option>
              </select>
            </InputGroup>
            <InputGroup>
              <Label>Doctor</Label>
              <input disabled placeholder={`${checkInData?.checkInBy?.firstName} ${checkInData?.checkInBy?.otherName} ${checkInData?.checkInBy?.lastName}`} />
            </InputGroup>
            <InputGroup>
              <Label>Check Out</Label>
              <input disabled placeholder={''} />
            </InputGroup>
          </div>
        </div>
        <div>
          <h4>
            Date Administered:{" "}
            {formatDate(data?.createdAt)}
          </h4>
          <h4>
            Vaccine Name:{" "}
            {data?.name ||
              // @ts-ignore
              data?.nameOfVaccine}
          </h4>
          <h4>
            Vaccination Type:{" "}
            {data?.type ||
              // @ts-ignore
              data?.vaccinationType}
          </h4>
          <h4>
            Dosage: {data?.dosage}
          </h4>
          <h4>
            Date of Next Shot:{" "}
            {data?.nextDate ||
              // @ts-ignore
              formatDate(data?.dateOfNextShot)}
          </h4>
          <h4>
            Email Reminder:{" "}
            {data?.emailReminder ? 'yes' : 'no'}
          </h4>
          <h4>
            SMS Reminder:{" "}
            <span>{data?.smsReminder ? 'yes' : 'no'}</span>
          </h4>
        </div>
      </>
  )
}