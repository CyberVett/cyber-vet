import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { LabCompletedHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from '../style.module.scss';
import dashboardStyles from '../../Dashboard/dashboard.module.scss';
import { formatDate } from 'lib/utils';
import MicrobiologyModal, { IMicrobiologyData } from 'containers/Patient/Laboratory/Modal/microbiologyModal';
import { defaultPathologyFields, defaultParasitologyFields, defaultRapidTestFields, defaultMicrobiologyFields } from 'containers/Patient/Laboratory/laboratoryTab';
import ParasitologyModal, { IParasitologyData } from 'containers/Patient/Laboratory/Modal/parasitologyModal';
import AddPathologyModal, { IPathologyData } from 'containers/Patient/Laboratory/Modal/pathologyModal';
import RapidTestModal, { IRapidTestData } from 'containers/Patient/Laboratory/Modal/rapidTestModal';

const CompletedLab: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [checkInData, setCheckInData] = useState({});
  const [togglePathology, setTogglePathology] = useState(false);
  const [toggleParasitology, setToggleParasitology] = useState(false);
  const [toggleMicrobiology, setToggleMicrobiology] = useState(false);
  const [toggleRapidtest, setToggleRapidtest] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [parasitologyData, setParasitologyData] = useState<IParasitologyData>();
  const [pathologyData, setPathologyData] = useState<IPathologyData>();
  const [microbiologyData, setMicrobiologyData] = useState<IMicrobiologyData>();
  const [rapidTestData, setRapidTestData] = useState<IRapidTestData>();
  // @ts-ignore
  const [modalError, setModalError] = useState({});


  useEffect(() => {
    requestClient.get('laboratory/completed')
      .then(response => {
        setLoading(false);
        if (response.status === 200 ) {
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

  const savePathology = (data: IPathologyData, method = "create") => {
    setModalLoading(true);

    let _data = {
      // @ts-ignore
      checkinId: data.checkinId,
      // @ts-ignore
      patientId: data.patientId,
    };
    if (method !== "create") {
      // @ts-ignore
      delete _data.clientId;
      Object.keys(defaultPathologyFields).map((key) => {
        // @ts-ignore
        _data[key] = data[key];
      });
    } else {
      _data = { ..._data, ...data };
      // @ts-ignore
      delete _data.nameOfTechnologist;
    }
    const url = `/laboratory/pathology/${
      method === "create" ? "add" : "complete"
    }`;
    const requestMethod = method === "create" ? "post" : "put";
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200) {
          setTogglePathology(false);
        }
      })
      .catch((error) => {
        setModalLoading(false);
        setModalError(error.message);
      });
  };

  const saveParasitology = (data: IParasitologyData, method = "create") => {
    setModalLoading(true);

    let _data = {
      // @ts-ignore
      checkinId: data.checkinId,
      // @ts-ignore
      patientId: data.patientId,
    };
    if (method !== "create") {
      // @ts-ignore
      delete _data.clientId;
      Object.keys(defaultParasitologyFields).map((key) => {
        // @ts-ignore
        _data[key] = data[key];
      });
    } else {
      _data = { ..._data, ...data };
    }
    const url = `/laboratory/parasitology/${
      method === "create" ? "add" : "complete"
    }`;
    const requestMethod = method === "create" ? "post" : "put";
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200) {
          setToggleParasitology(false);
        }
      })
      .catch((error) => {
        setModalLoading(false);
        setModalError(error.message);
      });
  };

  const saveMicrobiology = (data: IMicrobiologyData, method = "create") => {
    setModalLoading(true);    
    let _data = {
      // @ts-ignore
      checkinId: data.checkinId,
      // @ts-ignore
      patientId: data.patientId,
    };
    if (method !== "create") {
      // @ts-ignore
      delete _data.clientId;
      Object.keys(defaultMicrobiologyFields).map((key) => {
        // @ts-ignore
        _data[key] = data[key];
      });
    } else {
      _data = { ..._data, ...data };
    }    
    const url = `/laboratory/microbiology/${
      method === "create" ? "add" : "complete"
    }`;
    const requestMethod = method === "create" ? "post" : "put";
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200) {
          setToggleMicrobiology(false);
        }
      })
      .catch((error) => {
        setModalLoading(false);
        setModalError(error.message);
      });
  };

  const saveRapidTest = (data: IRapidTestData, method = "create") => {
    setModalLoading(true);

    let _data = {
      // @ts-ignore
      checkinId: data.checkinId,
      // @ts-ignore
      patientId: data.patientId,
    };
    if (method !== "create") {
      // @ts-ignore
      delete _data.clientId;
      Object.keys(defaultRapidTestFields).map((key) => {
        // @ts-ignore
        _data[key] = data[key];
      });
    } else {
      _data = { ..._data, ...data };
    }
    const url = `/laboratory/rapid-test-kit/${
      method === "create" ? "add" : "complete"
    }`;
    const requestMethod = method === "create" ? "post" : "put";
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200) {
          setToggleRapidtest(false);
        }
      })
      .catch((error) => {
        setModalLoading(false);
        setModalError(error.message);
      });
  };

  const showModal = (row: any) => {
    if(row.type === 'MICROBIOLOGY'){
      setMicrobiologyData(row);
      setToggleMicrobiology(true);
    } else if(row.type === 'RTK') {
      setRapidTestData(row);
      setToggleRapidtest(true);
    } else if (row.type === 'PATHOLOGY') {
      setPathologyData(row);
      setTogglePathology(true);
    } else if (row.type === 'PARASITOLOGY') {
      setParasitologyData(row);
      setToggleParasitology(true);
    } else {

    }
  }
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
                    <td>{formatDate(row?.dateCompleted)}</td>
                    <td><Button type={ButtonTypes.primary} onClick={() => showModal(row)}>Open</Button></td>
                  </tr>
                )} /> : <h2 style={{textAlign: 'center'}}>No completed lab request Found</h2>
          }
        </Card>
      </div>
      <MicrobiologyModal
        closeModal={() => {
          setToggleMicrobiology(false);
          window.location.reload();
        }}
        visible={toggleMicrobiology}
        // @ts-ignore
        data={microbiologyData}
        onAdd={(data: IMicrobiologyData) => {
          saveMicrobiology(data, "create");
        }}
        onComplete={(data: IMicrobiologyData) => {
          saveMicrobiology(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleMicrobiology(false);
        }}
        isReview={true}
      />
      <RapidTestModal
        closeModal={() => {
          setToggleRapidtest(false);
          window.location.reload();
        }}
        visible={toggleRapidtest}
        // @ts-ignore
        data={rapidTestData}
        onAdd={(data: IRapidTestData) => {
          saveRapidTest(data, "create");
        }}
        onComplete={(data: IRapidTestData) => {
          saveRapidTest(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleRapidtest(false);
        }}
        isReview={true}
      />
      <AddPathologyModal
        closeModal={() => {
          setTogglePathology(false);
          window.location.reload();
        }}
        visible={togglePathology}
        // @ts-ignore
        data={pathologyData}
        onAdd={(data: IPathologyData) => {
          savePathology(data, "create");
        }}
        onComplete={(data: IPathologyData) => {
          savePathology(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setTogglePathology(false);
        }}
        isReview={true}
      />
      <ParasitologyModal
        closeModal={() => {
          setToggleParasitology(false);
          window.location.reload();
        }}
        visible={toggleParasitology}
        // @ts-ignore
        data={parasitologyData}
        onAdd={(data: IParasitologyData) => {
          saveParasitology(data, "create");
        }}
        onComplete={(data: IParasitologyData) => {
          saveParasitology(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleParasitology(false);
        }}
        isReview={true}
      />
    </div>
  )
};

export default CompletedLab;
