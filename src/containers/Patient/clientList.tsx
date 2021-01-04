import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { ClientHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from '../../assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from './patient.module.scss';
import dashboardStyles from '../Dashboard/dashboard.module.scss';

const ClientList: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestClient.get('clients')
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
  return (
    <div>
      <div className={styles.topHeader}>
        <h2>{`Client List(${data.length})`}</h2>
        <div className={dashboardStyles.searchBar}>
          <SearchIcon />
          <Input
            placeholder="Search for clients"
          />
        </div>
        <Button type={ButtonTypes.primary} href="/app/patient/add/client">Add new clients</Button>
      </div>
      <div>
        <Card>
          {loading ? <Loader /> :
            <>
              { 
                data.length > 0 ?
                  <Table
                    data={data}
                    headers={ClientHeaders}
                    renderRow={(row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.title}. {row.firstName} {row.lastName}</td>
                        <td className={styles.address}>{row.address}</td>
                        <td>{row.phoneNumber}</td>
                        <td><Button href={`/app/client/edit/${row.id}`} type={ButtonTypes.grey}>edit</Button> <Button type={ButtonTypes.orange} href={`/app/client/${row.id}`} >Open</Button></td>
                      </tr>
                    )} />
                  : <h2 style={{ textAlign: 'center' }}>No clients found</h2>
              }
            </>
          }
        </Card>
      </div>
    </div>
  )
};

export default ClientList;
