import React from 'react';

import { ReactComponent as FolderIcon } from '../../assets/icons/folder.svg';
import { ReactComponent as PawIcon } from '../../assets/icons/paw.svg';

import { Input } from 'components/Input/input';
import Card, { CardHeader } from 'components/Card/card';
import Button from 'components/Button/button';

import styles from './dashboard.module.scss';

const Dashboard: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Input />
        </div>
        <div>
          <Card>
            <CardHeader>Recent patients</CardHeader>
            <div className={styles.patientCardBody}>
              <FolderIcon />
              <h3>Add new patient</h3>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>Appointment</CardHeader>
            <div className={styles.appointmentCardBody}>
              <FolderIcon />
              <h3>Add new patient</h3>
            </div>
          </Card>
        </div>
      </div>
      <aside className={styles.rightInfoPanel}>
        <Button>Add New patient</Button>
        <div>
          <Card className={styles.contactCard}>
            <div className={styles.contactCardPhoto}>
              <div></div>
              <h3>Dr. Fatunde Oluwande</h3>
              <p>Administrator</p>
            </div>
            <h4>0</h4>
            <p>Patient</p>
          </Card>
        </div>
        <div>
          <InfoCards data={12} text="New patients today" />
          <InfoCards data={12} text="Total patients" />
        </div>
      </aside>
    </div>
  )
};

interface IInfoCard {
  data: number;
  text: string;
}
const InfoCards: React.FC<IInfoCard> = ({ data, text }) => (
  <div className={styles.infoCards}>
    <div className={styles.infoCardsCircle}>
      <PawIcon />
    </div>
    <div>
      <h2>{data}</h2>
      <p>{text}</p>
    </div>
  </div>
)

export default Dashboard;
