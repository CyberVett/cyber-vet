import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { XRayCompleteHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from '../style.module.scss';
import dashboardStyles from '../../Dashboard/dashboard.module.scss';
import { formatDate } from 'lib/utils';
import RadiologyModal from 'containers/Patient/Radiology/radiologyModal';

const CompletedXray: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [checkInData, setCheckInData] = useState({});

  useEffect(() => {
    requestClient.get('laboratory/x-ray/completed')
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

  const showRadiology = (row: any) => {
    setCheckInData(row);
    setToggleEditModal(true);
  }

  return (
    <div>
      <div className={styles.topHeader}>
        <h2>X-Ray Examination Completed</h2>
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
                headers={XRayCompleteHeaders}
                renderRow={(row) => (
                  <tr key={row.id}>
                    <td>{row?.patientId}</td>
                    <td>{row?.client?.title}. {row?.client?.firstName} {row?.client?.otherName} {row?.client?.lastName}</td>
                    <td>{row?.patient?.name}</td>
                    <td>{row?.requestBy?.title}. {row?.requestBy?.firstName} {row?.requestBy?.otherName} {row?.requestBy?.lastName}</td>
                    <td>{formatDate(row?.dateCompleted)}</td>
                    <td><Button type={ButtonTypes.primary} onClick={() => showRadiology(row)}>Open</Button></td>
                  </tr>
                )} /> : <h2 style={{textAlign: 'center'}}>No completed x-ray Found</h2>
          }
        </Card>
      </div>
      <RadiologyModal
        checkInData={checkInData}
        // @ts-ignore
        checkInID={checkInData.id}
        closeModal={() => {setToggleEditModal(false); window.location.reload();}}
        disabled={true}
        // @ts-ignore
        patientNo={checkInData.patientId}
        visible={toggleEditModal}
      />
    </div>
  )
};

export default CompletedXray;
