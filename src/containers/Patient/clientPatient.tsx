import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { ClientPatientHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from '../../assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from './patient.module.scss';
import dashboardStyles from '../Dashboard/dashboard.module.scss';
import { NextPage, NextPageContext } from 'next';

const ClientPatientList: NextPage<{clientId: string}> = ({clientId}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get(`patients/client/${clientId}`)
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {

          setData(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  },[]);

  return (
    <div>
      <div className={styles.topHeader}>
        <h2>{`Client No: ${clientId}`}</h2>
        <div className={dashboardStyles.searchBar}>
        <SearchIcon />
          <Input 
            placeholder="Search for clients or Patients"
          />
          </div>
        <Button type={ButtonTypes.primary} href={`/app/patient/add?id=${clientId}`}>Add new patient</Button>
      </div>
      <div>
        <Card>
        {loading ? <Loader /> :
          <Table
            data={data}
            headers={ClientPatientHeaders}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.specie}</td>
                <td>{row.breed}</td>
                <td><Button>Check In</Button></td>
              </tr>
            )} />
          }
        </Card>
      </div>
    </div>
  )
};

export const actionButton = (status: string, id: string) => {
  if (status === 'returned') {
    return (
      <div style={{display: 'flex'}}>
        <Button href={`/app/patient/edit/${id}`}>Edit</Button>
        <Button>Check In</Button>
      </div>
    )
  } else {
    return (
      <div style={{display: 'flex'}}>
        <Button href={`/app/patient/edit/${id}`}>Edit</Button>
        <Button>Check Out</Button>
      </div>
    )
  }
};
ClientPatientList.getInitialProps = async ({ query }: NextPageContext) => {
  const clientId = (query && query.clientId) as string;  
  return {
    clientId
  }
}


export default ClientPatientList;
