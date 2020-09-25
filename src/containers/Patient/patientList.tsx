import React from 'react';

import { Input } from 'components/Input/input';
import Card from 'components/Card/card';
import { PatientHeaders, SamplePatientData } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import Table from 'components/Table/table';
import styles from './patient.module.scss'

const PatientList: React.FunctionComponent = () => {
  return (
    <div>
      <div className={styles.topHeader}>
        <h2>Pet boarding</h2>
        <Input />
        <Button type={ButtonTypes.primary} href="/app/patient/add/client">Add new patient</Button>
      </div>
      <div>
        <Card>
          <Table
            data={SamplePatientData}
            headers={PatientHeaders}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.patientNo}</td>
                <td>{row.clientName}</td>
                <td>{row.patientName}</td>
                <td>{row.specie}</td>
                <td>{row.breed}</td>
                <td>{
                  actionButton(row.status)
                }</td>
              </tr>
            )} />
        </Card>
      </div>
    </div>
  )
};

const actionButton = (status: string) => {
  if (status === 'returned') {
    return (
      <div>
        <Button>Edit</Button>
        <Button>Check In</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button>Edit</Button>
        <Button>Check Out</Button>
      </div>
    )
  }
};

export default PatientList;
