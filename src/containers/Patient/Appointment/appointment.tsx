import Button, { ButtonTypes } from 'components/Button/button';
import Card, { CardHeader } from 'components/Card/card';
import { ReactComponent as FolderIcon } from "../../../assets/icons/folder.svg";
import React, { useState } from 'react';

import styles from './appointment.module.scss';
import AppointmentModal from './appointmentModal';

const Appointment = () => {

  const [toggleModal, setToggleModal] = useState(false);


  return (
    <section>
      <div className={styles.formMenu}>
          <Button onClick={() => setToggleModal(true)} type={ButtonTypes.primary}>+ New Appointment</Button>
      </div>
      <Card>
        <CardHeader>Appointment</CardHeader>
        <div className={styles.appointmentCardBody}>
          <FolderIcon />
          <h3>No appointment added</h3>
        </div>
      </Card>
      <AppointmentModal
        closeModal={() => setToggleModal(false)}
        visible={toggleModal}
      />
    </section>
  )
};

export default Appointment;
