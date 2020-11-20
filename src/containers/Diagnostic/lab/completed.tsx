import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { LabCompletedHeaders } from 'config/constants';
import Button from 'components/Button/button';

import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from '../style.module.scss';
import dashboardStyles from '../../Dashboard/dashboard.module.scss';
import { formatDate } from 'lib/utils';

const CompletedLab: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get('laboratory/completed')
      .then(response => {
        setLoading(false);
        if (response.status === 200 && response.statusText === 'OK') {
          const { data: { data: { microbiology, rtk, parasitology, pathology } } } = response;
          let newResult: any = [...microbiology, ...rtk, ...parasitology, ...pathology]
          setData(newResult);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }, []);

  return (
    <div>
      <div className={styles.topHeader}>
        <h2>Lab Test Completed</h2>
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
                headers={LabCompletedHeaders}
                renderRow={(row) => (
                  <tr key={row.id}>
                    <td>{row?.patientId}</td>
                    <td>{row?.client?.title}. {row?.client?.firstName} {row?.client?.otherName} {row?.client?.lastName}</td>
                    <td>{row?.patient?.name}</td>
                    <td>{row?.requestBy?.title}. {row?.requestBy?.firstName} {row?.requestBy?.otherName} {row?.requestBy?.lastName}</td>
                    <td>{row?.type}</td>
                    <td>{formatDate(row?.createdAt)}</td>
                    <td><Button>Open</Button></td>
                  </tr>
                )} /> : <h2 style={{textAlign: 'center'}}>No completed lab request Found</h2>
          }
        </Card>
      </div>
    </div>
  )
};

export default CompletedLab;
