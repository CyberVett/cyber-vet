import React, { useEffect, useState } from 'react';

import Card from 'components/Card/card';
import { Input } from 'components/Input/input';
import { LabRequestHeaders } from 'config/constants';
import Button, { ButtonTypes } from 'components/Button/button';

import { ReactComponent as Loader } from 'assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import Table from 'components/Table/table';
import requestClient from 'lib/requestClient';

import styles from '../style.module.scss';
import dashboardStyles from '../../Dashboard/dashboard.module.scss';
import { formatDate } from 'lib/utils';
import MicrobiologyModal, { IMicrobiologyData } from 'containers/Patient/Laboratory/Modal/microbiologyModal';
import ParasitologyModal, { IParasitologyData } from 'containers/Patient/Laboratory/Modal/parasitologyModal';
import AddPathologyModal, { IPathologyData } from 'containers/Patient/Laboratory/Modal/pathologyModal';
import RapidTestModal, { IRapidTestData } from 'containers/Patient/Laboratory/Modal/rapidTestModal';
import { defaultMicrobiologyFields, defaultParasitologyFields, defaultPathologyFields, defaultRapidTestFields } from 'containers/Patient/Laboratory/laboratoryTab';

const RequestedLab: React.FunctionComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
    requestClient.get('laboratory/requested')
      .then(response => {
        setLoading(false);
        if (response.status === 200 ) {
          const { data: { data: { microbiology, rtk, parasitology, pathology } } } = response;
          // @ts-ignore
          let newArray: any = [...microbiology, ...rtk, ...parasitology, ...pathology];
          setData(newArray);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      })
  }, []);

  const showModal = (row: any) => {
    if (row.type === 'MICROBIOLOGY') {
      setMicrobiologyData(row);
      setToggleMicrobiology(true);
    } else if (row.type === 'RTK') {
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
      // @ts-ignore
      _data = { ..._data, ...data };
      // @ts-ignore
      delete _data.nameOfTechnologist;
    }
    let url = `/laboratory/pathology/${method === "create" ? "add" : "complete"
      }`;
    const requestMethod = method === "create" ? "post" : "put";
    if (method === "edit") {
      url = `/laboratory/pathology/update`;
    }
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
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
    let url = `/laboratory/parasitology/${method === "create" ? "add" : "complete"
      }`;
    let requestMethod = method === "create" ? "post" : "put";
    if (method === "edit") {
      url = `/laboratory/parasitology/update`;
    }
    // @ts-ignore
    requestClient[requestMethod](url, _data)
      .then((response: any) => {
        setModalLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setToggleParasitology(false);
        }
      })
      .catch((error: any) => {
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
    let url = `/laboratory/microbiology/${method === "create" ? "add" : "complete"
      }`;
    const requestMethod = method === "create" ? "post" : "put";
    if (method === "edit") {
      url = `/laboratory/microbiology/update`;
    }
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
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
    let url = `/laboratory/rapid-test-kit/${method === "create" ? "add" : "complete"
      }`;
    const requestMethod = method === "create" ? "post" : "put";
    if (method === "edit") {
      url = `/laboratory/rapid-test-kit/update`;
    }
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setToggleRapidtest(false);
        }
      })
      .catch((error) => {
        setModalLoading(false);
        setModalError(error.message);
      });
  };

  return (
    <div>
      <div className={styles.topHeader}>
        <h2>Lab Test Requested</h2>
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
                headers={LabRequestHeaders}
                renderRow={(row) => (
                  <tr key={row.id}>
                    <td>{row?.patientId}</td>
                    <td>{row?.client?.title}. {row?.client?.firstName} {row?.client?.otherName} {row?.client?.lastName}</td>
                    <td>{row?.patient?.name}</td>
                    <td>{row?.requestBy?.title}. {row?.requestBy?.firstName} {row?.requestBy?.otherName} {row?.requestBy?.lastName}</td>
                    <td>{row?.type}</td>
                    <td>{formatDate(row?.createdAt)}</td>
                    <td><Button type={ButtonTypes.primary} onClick={() => showModal(row)}>Open</Button></td>
                  </tr>
                )} /> : <h2 style={{ textAlign: 'center' }}>No lab requests Found</h2>
          }
        </Card>
      </div>
      <MicrobiologyModal
        closeModal={() => { setToggleMicrobiology(false); window.location.reload(); }}
        visible={toggleMicrobiology}
        // @ts-ignore
        data={microbiologyData}
        onAdd={(data: IMicrobiologyData) => {
          saveMicrobiology(data, "create");
        }}
        onComplete={(data: IMicrobiologyData) => {
          saveMicrobiology(data, "complete");
        }}
        onEdit={
          (data: IMicrobiologyData) => {
            saveMicrobiology(data, "edit");
          }
        }
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleMicrobiology(false);
        }}
        isReview={true}
      />
      <RapidTestModal
        closeModal={() => { setToggleRapidtest(false); window.location.reload(); }}
        visible={toggleRapidtest}
        // @ts-ignore
        data={rapidTestData}
        onAdd={(data: IRapidTestData) => {
          saveRapidTest(data, "create");
        }}
        onComplete={(data: IRapidTestData) => {
          saveRapidTest(data, "complete");
        }}
        onEdit={(data: IRapidTestData) => {
          saveRapidTest(data, "edit");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleRapidtest(false);
        }}
        isReview={true}
      />
      <AddPathologyModal
        closeModal={() => { setTogglePathology(false); window.location.reload(); }}
        visible={togglePathology}
        // @ts-ignore
        data={pathologyData}
        onAdd={(data: IPathologyData) => {
          savePathology(data, "create");
        }}
        onComplete={(data: IPathologyData) => {
          savePathology(data, "complete");
        }}
        onEdit={(data: IPathologyData) => {
          savePathology(data, "edit");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setTogglePathology(false);
        }}
        isReview={true}
      />
      <ParasitologyModal
        closeModal={() => { setToggleParasitology(false); window.location.reload(); }}
        visible={toggleParasitology}
        // @ts-ignore
        data={parasitologyData}
        onAdd={(data: IParasitologyData) => {
          saveParasitology(data, "create");
        }}
        onComplete={(data: IParasitologyData) => {
          saveParasitology(data, "complete");
        }}
        onEdit={(data: IParasitologyData) => {
          saveParasitology(data, "edit");
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

export default RequestedLab;
