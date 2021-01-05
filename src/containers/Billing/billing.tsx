import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { BillingHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from '../../assets/icons/loader.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from './billing.module.scss';
import BillingModal from './billingModal';
import Modal from 'components/Modal/modal';
import { FormErrors } from 'components/Input/input';

const BillingList: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleModal, setToggleModal] = useState(false);
  const [responseModal, toggleResponseModal] = useState(false);
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [rowData, setRowData] = useState();
  const [billingId, setBillingId] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    requestClient.get('/billings/services')
      .then(response => {
        setLoading(false);
        if (response.status === 200) {
          setData(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }, []);

  const deleteBilling = (id: string) => {
    setLoading(true);
    requestClient.delete(`/billings/services/${id}`)
      .then(response => {
        setLoading(false);
        if (response.status === 200) {
          toggleResponseModal(true);
        } else {
          setError(response.data.message);
        }
        setTimeout(() => {
          toggleResponseModal(true);
        }, 3000)
      })
      .catch(error => {
        console.log(error);

        setLoading(false);
        setError(error.response.data.message)
      })
  };

  const handleReview = (row: any) => {
    setBillingId(row?.id);
    setRowData(row);
    setToggleReviewModal(true);
  }

  return (
    <div>
      <div className={styles.topHeader}>
        <h2>Billing</h2>
        <Button onClick={() => setToggleModal(true)} type={ButtonTypes.primary}>Add New</Button>
      </div>
      <div>
        <Card>
          {loading ? <Loader /> :
            data.length > 0 ?
              <>
                <FormErrors errors={error} />
                <Table
                  data={data}
                  headers={BillingHeaders}
                  renderRow={(row) => (
                    <tr key={row.id}>
                      <td>{row.department.name}</td>
                      <td>{row?.name}</td>
                      <td>{row?.charges}</td>
                      <td><Button type={ButtonTypes.grey} onClick={() => handleReview(row)}>Edit</Button></td>
                      <td><Button type={ButtonTypes.orange} onClick={() => deleteBilling(row.id)}>Remove</Button></td>
                    </tr>
                  )} /> </> : <h2 style={{textAlign: 'center'}}>No billings Found</h2>
          }
          {/* Review Modal */}
          <BillingModal
            billingId={billingId}
            closeModal={() => {
              setToggleReviewModal(false);
              window.location.reload();
            }}
            isReview={true}
            modalData={rowData}
            visible={toggleReviewModal}
          />
          {/* Create new modal */}
          <BillingModal
            closeModal={() => {
              setToggleModal(false);
              window.location.reload();
            }}
            visible={toggleModal}
          />
          <Modal
            closeModal={() => {
              toggleResponseModal(false);
              window.location.reload();
            }}
            subtitle="Billing has been deleted successfully"
            title="Billing Deleted"
            visible={responseModal}
          />
        </Card>
      </div>
    </div>
  )
};

export default BillingList;
