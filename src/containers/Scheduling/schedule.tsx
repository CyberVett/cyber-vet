import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { AppointmentHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from '../../assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from './schedule.module.scss';
import dashboardStyles from '../Dashboard/dashboard.module.scss';

const AppointmentList: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get('appointments')
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
        <h2>Appointment</h2>
        <div className={dashboardStyles.searchBar}>
          <SearchIcon />
          <Input
            placeholder="Search appointments"
          />
        </div>
        <Button type={ButtonTypes.primary}>Today</Button>
      </div>
      <div>
        <Card>
          {loading ? <Loader /> :
            data.length > 0 ?
              <Table
                data={data}
                headers={AppointmentHeaders}
                renderRow={(row) => (
                  <tr key={row.id}>
                    <td>{row?.appointmentDate}</td>
                    <td>{row?.patient?.name}</td>
                    <td>{row?.scheduler?.title}. {row?.scheduler?.firstName} {row?.scheduler?.otherName} {row?.scheduler?.lastName}</td>
                    <td>{row?.reason}</td>
                    <td>{row?.status}</td>
                    <td>{
                      // TODO: add roles and permissions
                      actionButton(row.id, row.patientId, deleteAppointment)
                    }</td>
                  </tr>
                )} /> : <h2>No appointments Found</h2>
          }
        </Card>
      </div>
    </div>
  )
};

export const actionButton = (id: string, patientId: string, deleteAppointment: (id: string, patientId: string) => void, checkOut?: (id: string) => void, hideEdit?: boolean) => {
  return (
    <>
      <Button>Review</Button>
      <Button onClick={() => deleteAppointment(id, patientId)}>Delete</Button>
    </>
  )
};

export default AppointmentList;
