import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { PatientHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from '../../assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from './patient.module.scss';
import dashboardStyles from '../Dashboard/dashboard.module.scss';
import Router from 'next/router';

const PatientList: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get('patients')
      .then(response => {
        setLoading(false);
        if (response.status === 200 ) {
          setData(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }, []);

  const checkIn = (id: string) => {
    setLoading(true);
    requestClient.put(`/patients/${id}/check-in`)
      .then((response) => {
        setLoading(false);
        if (response.status === 200 ) {
          Router.push(`/app/patient/checkin/${id}`);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
    }
  
  return (
    <div>
      <div className={styles.topHeader}>
      <h2>{`Patient List(${data.length})`}</h2>
        <div className={dashboardStyles.searchBar}>
          <SearchIcon />
          <Input
            placeholder="Search for clients or Patients"
          />
        </div>
        <Button type={ButtonTypes.primary} href="/app/patient/add/client">Add new patient</Button>
      </div>
      <div>
        <Card>
          {loading ? <Loader /> :
            data.length > 0 ?
              <Table
                data={data}
                headers={PatientHeaders}
                renderRow={(row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row?.client?.title}. {row?.client?.firstName} {row?.client?.lastName}</td>
                    <td>{row.name}</td>
                    <td>{row.specie}</td>
                    <td>{row.breed}</td>
                    <td>{
                      // TODO: add roles and permissions
                      actionButton(row.checkedIn, row.id, checkIn)
                    }</td>
                  </tr>
                )} /> : <h2 style={{textAlign: 'center'}}>No Patient Record Found</h2>
          }
        </Card>
      </div>
    </div>
  )
};

export const actionButton = (checkedIn: boolean, id: string, checkIn: (id: string) => void, hideEdit?: boolean) => {
  if (!checkedIn) {
    return (
      <div style={{ display: 'flex' }}>
        {!hideEdit && <Button type={ButtonTypes.grey} href={`/app/patient/edit/${id}`}>Edit</Button>}
        &nbsp;&nbsp;<Button type={ButtonTypes.primary} onClick={() => checkIn(id)}>Check In</Button>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex' }}>
        { !hideEdit && <Button type={ButtonTypes.grey} href={`/app/patient/edit/${id}`}>Edit</Button>}
        &nbsp;&nbsp;<Button type={ButtonTypes.orange} href={`/app/patient/checkin/${id}`}>Checked In</Button>
      </div>
    )
  }
};

export default PatientList;
