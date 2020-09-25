import React from 'react';

import SectionHeader from 'components/SectionHeader/sectionHeader';
import Card, { CardTabs } from 'components/Card/card';
import { BoardingTabs } from 'config/constants';

import styles from './boarding.module.scss';

const BoardingDetails: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Card>
            <CardTabs items={BoardingTabs} />
            <SectionHeader title="Boarding Details" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BoardingDetails;
