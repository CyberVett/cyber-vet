import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { XRayHeaders } from 'config/constants';
import Button from 'components/Button/button';

import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from '../style.module.scss';
import dashboardStyles from '../../Dashboard/dashboard.module.scss';
import { formatDate } from 'lib/utils';
import RadiologyModal from 'containers/Patient/Radiology/radiologyModal';

const RequestedXray: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [checkInData, setCheckInData] = useState({});

  useEffect(() => {
    requestClient.get('laboratory/x-ray/requested')
      .then(response => {
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

  const showRadiology = (row: any) => {
    setCheckInData(row);
    setToggleEditModal(true);
  }

  return (
    <div>
      <div className={styles.topHeader}>
        <h2>X-Ray Examination Requested</h2>
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
                headers={XRayHeaders}
                renderRow={(row) => (
                  <tr key={row.id}>
                    <td>{row?.patientId}</td>
                    <td>{row?.client?.title}. {row?.client?.firstName} {row?.client?.otherName} {row?.client?.lastName}</td>
                    <td>{row?.patient?.name}</td>
                    <td>{row?.requestBy?.title}. {row?.requestBy?.firstName} {row?.requestBy?.otherName} {row?.requestBy?.lastName}</td>
                    <td>{formatDate(row?.createdAt)}</td>
                    <td><Button onClick={() => showRadiology(row)}>Open</Button></td>
                  </tr>
                )} /> : <h2 style={{textAlign: 'center'}}>No xray request Found</h2>
          }
        </Card>
      </div>
      <RadiologyModal
        checkInData={checkInData}
        checkInID={checkInData.checkinId}
        closeModal={() => setToggleEditModal(false)}
        patientNo={checkInData.patientId}
        visible={toggleEditModal}
      />
    </div>
  )
};

export default RequestedXray;
