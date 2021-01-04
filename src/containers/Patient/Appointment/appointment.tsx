import Button, { ButtonTypes } from 'components/Button/button';
import Card, { CardHeader } from 'components/Card/card';
import { ReactComponent as FolderIcon } from "../../../assets/icons/folder.svg";
import React, { useState } from 'react';
import { ReactComponent as Loader } from "../../../assets/icons/loader.svg";

import styles from './appointment.module.scss';
import AppointmentModal from './appointmentModal';
import Table from 'components/Table/table';
import { AppointmentHeaders } from 'config/constants';
import requestClient from 'lib/requestClient';
import Modal from 'components/Modal/modal';
import { FormErrors } from 'components/Input/input';
import { IAppointment, IAppointmentArray } from 'types/user';
import { formatDate } from 'lib/utils';


const Appointment: React.FC<IAppointment> = ({
  patientNo,
  appointments,
}) => {

  const [toggleModal, setToggleModal] = useState(false);
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [responseModal, toggleResponseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rowData, setRowData] = useState<IAppointmentArray>();

  const handleReview = (row: any) => {    
    setRowData(row);
    setToggleReviewModal(true);
  }

  const deleteAppointment = (id: string) => {
    setLoading(true);
    requestClient.delete(`appointments/${id}`)
      .then(response => {
        setLoading(false);
        if (response.status === 200 ) {
          toggleResponseModal(true);
        } else {
          setError(response.data.message);
        }
        setTimeout(() => {
          toggleResponseModal(true);
        }, 3000)
      })
      .catch(error => {
        setLoading(false);
        setError(error.response.data.message)
      })
  };

  return (
    <section>
      <div className={styles.formMenu}>
        <Button onClick={() => setToggleModal(true)} type={ButtonTypes.primary}>+ New Appointment</Button>
      </div>
      <Card>
        <CardHeader>Appointment</CardHeader>
        {
          loading ? <Loader /> :
            <>
              {
                appointments?.length > 0 ?
                  <>
                    <FormErrors errors={error} />
                    <Table
                      data={appointments}
                      headers={AppointmentHeaders}
                      renderRow={(row) => (
                        <tr key={row.id}>
                          <td>{formatDate(row.createdAt)}</td>
                          <td>{row.patientName}</td>
                          <td>{row?.scheduler?.title} {row?.scheduler?.firstName} {row?.scheduler?.otherName} {row?.scheduler?.lastName}</td>
                          <td>{row.reason}</td>
                          <td>{row.status}</td>
                          <td><Button type={ButtonTypes.grey} onClick={() => handleReview(row)}>Review</Button></td>
                          <td><Button type={ButtonTypes.orange} onClick={() => deleteAppointment(row.id)}>Delete</Button></td>
                        </tr>
                      )}
                    />
                  </> : <div className={styles.appointmentCardBody}>
                    <FolderIcon />
                    <h3>No appointment added</h3>
                  </div>
              }
            </>
        }

      </Card>
      <Modal
        closeModal={() => {
          toggleResponseModal(false);
          window.location.reload();
        }}
        subtitle="Patient's appointment has been deleted successfully"
        title="Appointment Deleted"
        visible={responseModal}
      />
      {/* Create new modal */}
      <AppointmentModal
        closeModal={() => {
          setToggleModal(false);
          window.location.reload();
        }}
        patientNo={patientNo}
        visible={toggleModal}
      />
      {/* Review Modal */}
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
    </section>
  )
};

export default Appointment;
