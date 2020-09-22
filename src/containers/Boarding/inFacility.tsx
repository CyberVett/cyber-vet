import React from 'react';

import { Input } from 'components/Input/input';
import Card from 'components/Card/card';
import Button, { ButtonTypes } from 'components/Button/button';

import SectionHeader from 'components/SectionHeader/sectionHeader';
import Table from 'components/Table/table';
import { BoardingHeaders, SampleBoardingData } from 'config/constants';
// import styles from './boarding.module.scss';

const Boarding: React.FunctionComponent = () => {
  return (
    <div>
      <div >
        <h2>Pet boarding</h2>
        <Input />
        <Button type={ButtonTypes.primary}>Board new pet</Button>
      </div>
      <div>
        <Card>
          <SectionHeader title={`currently boarding (${2})`}><h2>Total Register (7)</h2></SectionHeader>
          <Table
            data={SampleBoardingData}
            headers={BoardingHeaders}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.clientName}</td>
                <td>{row.petName}</td>
                <td>{row.specie}</td>
                <td>{row.breed}</td>
                <td>{row.duration}</td>
                <td>{row.status}</td>
                <td>{
                 actionButton(row.status)
                }</td>
              </tr>
            )} />
        </Card>
      </div>
    </div>
  )
};

const actionButton = (status: string) => {
  if (status === 'returned') {
    return (
    <div>
      <Button>Check In</Button>
      <Button>Delete</Button>
    </div>
  )
  } else {
    return (
      <div>
        <Button>Review</Button>
        <Button>Delete</Button>
      </div>
    )
  }
}


export default Boarding;
