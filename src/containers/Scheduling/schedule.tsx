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
import { formatDate } from 'lib/utils';
import AppointmentModal from 'containers/Patient/Appointment/appointmentModal';
import { IAppointmentArray } from 'types/user';

const AppointmentList: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [rowData, setRowData] = useState<IAppointmentArray>();
  const [patientNo, setPatientNo] = useState('');

  useEffect(() => {
    requestClient.get('appointments')
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

  const deleteAppointment = (id: string, patientNo: string) => {
    setLoading(true);
    requestClient.delete(`patients/${patientNo}/appointment/${id}`)
      .then(response => {
        setLoading(false);
        if (response.status === 200 ) {
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

  const handleReview = (row: any) => { 
    setPatientNo(row?.patientId);   
    setRowData(row);
    setToggleReviewModal(true);
  }

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
                    <td>{formatDate(row?.appointmentDate)}</td>
                    <td>{row?.patient?.name}</td>
                    <td>{row?.scheduler?.title}. {row?.scheduler?.firstName} {row?.scheduler?.otherName} {row?.scheduler?.lastName}</td>
                    <td>{row?.reason}</td>
                    <td>{row?.status}</td>
                    <td><Button type={ButtonTypes.grey} onClick={() => handleReview(row)}>Review</Button></td>
                    <td><Button type={ButtonTypes.orange} onClick={() => deleteAppointment(row.id, row.patientId)}>Delete</Button></td>
                  </tr>
                )} /> : <h2 style={{textAlign: 'center'}}>No appointments Found</h2>
          }
          <AppointmentModal
            closeModal={() => {
              setToggleReviewModal(false);
              window.location.reload();
            }}
            isReview={true}
            modalData={rowData}
            patientNo={patientNo}
            visible={toggleReviewModal}
          />
        </Card>
      </div>
    </div>
  )
};

export default AppointmentList;
