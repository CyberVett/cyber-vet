import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { AppointmentHeaders, LabRequestHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from '../style.module.scss';
import dashboardStyles from '../../Dashboard/dashboard.module.scss';

const RequestedLab: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get('laboratory/requested')
      .then(response => {
        console.log('appointmnt', response);

        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          setData(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }, []);

  const deleteAppointment = (id: string, patientNo: string) => {
    setLoading(true);
    requestClient.delete(`patients/${patientNo}/appointment/${id}`)
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          // toggleResponseModal(true);
        } else {
          // setError(response.data.message);
        }
        setTimeout(() => {
          // toggleResponseModal(true);
        }, 3000)
      })
      .catch(error => {
        console.log(error);
        
        setLoading(false);
        // setError(error.response.data.message)
      })
  };

  return (
    <div>
      <div className={styles.topHeader}>
        <h2>Lab Test Requested</h2>
        <div className={dashboardStyles.searchBar}>
          <SearchIcon />
          <Input
            placeholder="Search patients"
          />
        </div>
        <div></div>
      </div>
      <div>
        <Card>
          {loading ? <Loader /> :
            data.length > 0 ?
              <Table
                data={data}
                headers={LabRequestHeaders}
                renderRow={(row) => (
                  <tr key={row.id}>
                    <td>{row?.appointmentDate}</td>
                    <td>{row?.patient?.name}</td>
                    <td>{row?.scheduler?.title}. {row?.scheduler?.firstName} {row?.scheduler?.otherName} {row?.scheduler?.lastName}</td>
                    <td>{row?.reason}</td>
                    <td>{row?.status}</td>
                    <td><Button>Open</Button></td>
                  </tr>
                )} /> : <h2 style={{textAlign: 'center'}}>No lab requests Found</h2>
          }
        </Card>
      </div>
    </div>
  )
};

export default RequestedLab;
