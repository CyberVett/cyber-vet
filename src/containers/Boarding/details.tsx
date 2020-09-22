import React from 'react';

import SectionHeader from 'components/SectionHeader/sectionHeader';
import Card, { CardTabs } from 'components/Card/card';
import { PatientTabs } from 'config/constants';

import styles from './boarding.module.scss';

const BoardingDetails: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Card>
            <CardTabs items={PatientTabs} />
            <SectionHeader title="Boarding Details" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BoardingDetails;
