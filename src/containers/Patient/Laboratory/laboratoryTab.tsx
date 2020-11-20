import Button, { ButtonTypes } from "components/Button/button";
import CheckinItem from "components/CheckIn/CheckinItem";
import { InputGroup, Label } from "components/Input/input";
import requestClient from "lib/requestClient";
import React, { useEffect, useState } from "react";

import styles from "./laboratory.module.scss";
import MicrobiologyModal, {
  IMicrobiologyData,
} from "./Modal/microbiologyModal";
import ParasitologyModal, {
  IParasitologyData,
} from "./Modal/parasitologyModal";
import AddPathologyModal, { IPathologyData } from "./Modal/pathologyModal";
import RapidTestModal, { IRapidTestData } from "./Modal/rapidTestModal";

const defaultPathologyFields: IPathologyData = {
  tentativeDiagnosis: "",
  caseHistory: "",
  testsRequired: "",
  typeOfSampleSubmitted: "",
  RBC: "",
  haemoglobin: "",
  PCV: "",
  MCV: "",
  MCH: "",
  MCHC: "",
  WBC: "",
  neutrophils: "",
  bands: "",
  lymphocytes: "",
  monocytes: "",
  eosinophils: "",
  platelets: "",
  mpv: "",
  totalProtein: "",
  totalProteinRequired: false,
  totalBilirubin: "",
  totalBilirubinRequired: false,
  conjugatedBilirubin: "",
  conjugatedBilirubinRequired: false,
  sodium: "",
  sodiumRequired: false,
  potassium: "",
  potassiumRequired: false,
  creatinine: "",
  creatinineRequired: false,
  BUN: "",
  BUNRequired: false,
  albumin: "",
  albuminRequired: false,
  glucose: "",
  glucoseRequired: false,
  SGOTAST: "",
  SGOTASTRequired: false,
  SGPTALT: "",
  SGPTALTRequired: false,
  ALT: "",
  ALTRequired: false,
  liquidProfile: "",
  liquidProfileRequired: false,
  other: "",
  otherRequired: false,
  nameOfTechnologist: "",
};

const defaultParasitologyFields: IParasitologyData = {
  tentativeDiagnosis: "",
  caseHistory: "",
  testsRequired: "",
  bloodSampleSubmitted: false,
  urineSampleSubmitted: false,
  stoolSampleSubmitted: false,
  skinScrappingSampleSubmitted: false,
  otherSampleSubmitted: false,
  conditionOfSpecimen: "",
  bloodResult: "",
  PCVResult: "",
  wetMountResult: "",
  skinScrappingResult: "",
  facialAnalysisResult: "",
  urineAnalysisResult: "",
};

const defaultMicrobiologyFields: IMicrobiologyData = {
  natureOfSpecimen: "",
  clinicalDetails: "",
  tentativeDiagnosis: "",
  testsRequired: "",
  result: "",
  dateOfCollection: "",
  dateOfSubmission: "",
};

const defaultRapidTestFields: IRapidTestData = {
  typeOfSpecimen: "",
  clinicalDetails: "",
  tentativeDiagnosis: "",
  testsRequired: "",
  result: "",
};

const LaboratoryTab = ({
  patientData,
  checkInData,
}: {
  patientData: any;
  checkInData: any;
}) => {
  const [togglePathology, setTogglePathology] = useState(false);
  const [toggleParasitology, setToggleParasitology] = useState(false);
  const [toggleMicrobiology, setToggleMicrobiology] = useState(false);
  const [toggleRapidtest, setToggleRapidtest] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState({});

  const [parasitologyData, setParasitologyData] = useState<IParasitologyData>(
    checkInData?.parasitology || defaultParasitologyFields
  );
  const [pathologyData, setPathologyData] = useState<IPathologyData>(
    checkInData?.pathology || defaultPathologyFields
  );

  const [microbiologyData, setMicrobiologyData] = useState<IMicrobiologyData>(
    checkInData?.microbiology || defaultMicrobiologyFields
  );

  const [rapidTestData, setRapidTestData] = useState<IRapidTestData>(
    checkInData?.rapidTestKit || defaultRapidTestFields
  );

  useEffect(() => {
    setParasitologyData(checkInData?.parasitology || defaultParasitologyFields);
    setPathologyData(checkInData?.pathology || defaultPathologyFields);
    setMicrobiologyData(checkInData?.microbiology || defaultMicrobiologyFields);
    setRapidTestData(checkInData?.rapidTestKit || defaultRapidTestFields);
  }, [checkInData]);

  const savePathology = (data: IPathologyData, method = "create") => {
    setModalLoading(true);

    let _data = {
      checkinId: checkInData.id,
      patientId: patientData.id,
    };
    if (method !== "create") {
      delete _data.clientId;
      Object.keys(defaultPathologyFields).map((key) => {
        _data[key] = data[key];
      });
    } else {
      _data = { ..._data, ...data };
    }
    const url = `/laboratory/pathology/${
      method === "create" ? "add" : "complete"
    }`;
    const requestMethod = method === "create" ? "post" : "put";
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
      checkinId: checkInData.id,
      patientId: patientData.id,
    };
    if (method !== "create") {
      delete _data.clientId;
      Object.keys(defaultParasitologyFields).map((key) => {
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
        if (response.status === 200 && response.statusText === "OK") {
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
      checkinId: checkInData.id,
      patientId: patientData.id,
    };
    if (method !== "create") {
      delete _data.clientId;
      Object.keys(defaultMicrobiologyFields).map((key) => {
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
      checkinId: checkInData.id,
      patientId: patientData.id,
    };
    if (method !== "create") {
      delete _data.clientId;
      Object.keys(defaultRapidTestFields).map((key) => {
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
    <section>
      <div className={styles.formMenu}>
        <Button
          onClick={() => setTogglePathology(true)}
          type={ButtonTypes.primary}
        >
          + Pathology Form
        </Button>
        <Button
          onClick={() => setToggleParasitology(true)}
          type={ButtonTypes.primary}
        >
          + Parasitology Form
        </Button>
        <Button
          onClick={() => setToggleMicrobiology(true)}
          type={ButtonTypes.primary}
        >
          + Microbiology Form
        </Button>
        <Button
          onClick={() => setToggleRapidtest(true)}
          type={ButtonTypes.primary}
        >
          + Rapid Test Kit
        </Button>
      </div>
      <div className={styles.formDetails}>
        <div className={styles.formDetailsInfo}>
          <InputGroup>
            <Label>Check In</Label>
            <input disabled placeholder={new Date().toLocaleString()} />
          </InputGroup>
          <InputGroup>
            <Label>Visit Type</Label>
            <select>
              <option>Follow up</option>
              <option>First Visit</option>
            </select>
          </InputGroup>
          <InputGroup>
            <Label>Doctor</Label>
            <input disabled placeholder={`Wande Coal`} />
          </InputGroup>
          <InputGroup>
            <Label>Check Out</Label>
            <input disabled placeholder={new Date().toLocaleString()} />
          </InputGroup>
        </div>
      </div>
      <MicrobiologyModal
        closeModal={() => setToggleMicrobiology(false)}
        visible={toggleMicrobiology}
        data={microbiologyData}
        onAdd={(data: IMicrobiologyData) => {
          saveMicrobiology(data, "create");
        }}
        onComplete={(data: IPathologyData) => {
          savePathology(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleMicrobiology(false);
        }}
      />
      <RapidTestModal
        closeModal={() => setToggleRapidtest(false)}
        visible={toggleRapidtest}
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
      />
      <AddPathologyModal
        closeModal={() => setTogglePathology(false)}
        visible={togglePathology}
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
      />
      <ParasitologyModal
        closeModal={() => setToggleParasitology(false)}
        visible={toggleParasitology}
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
      ></ParasitologyModal>
      {(pathologyData.albumin || "") && (
        <CheckinItem
          checkedIn={true}
          date={new Date().toString()}
          onDelete={() => setPathologyData(defaultPathologyFields)}
          onEdit={() => {
            setTogglePathology(true);
          }}
          disableDelete
          title="Pathology Test"
        >
          <table className={styles.overviewTable}>
            <tr>
              <td>Case History</td>
              <td>{pathologyData.caseHistory}</td>
            </tr>
            <tr>
              <td>Tentative Diagnosis</td>
              <td>{pathologyData.tentativeDiagnosis}</td>
            </tr>
            <tr>
              <td>Type of sample submitted</td>
              <td>{pathologyData.typeOfSampleSubmitted}</td>
            </tr>
            <tr>
              <td>Test(s) required</td>
              <td>{pathologyData.testsRequired}</td>
            </tr>
          </table>
          <div className={styles.labCheckinDataListContainer}>
            <div>
              <h5>Haemotology</h5>
              <table>
                <tr>
                  <td>RBC (x 1013/l)</td>
                  <td>{pathologyData.RBC}</td>
                </tr>
                <tr>
                  <td>Haemoglobin (g/dl)</td>
                  <td>{pathologyData.haemoglobin}</td>
                </tr>
                <tr>
                  <td>MCV (fl)</td>
                  <td>{pathologyData.MCV}</td>
                </tr>
                <tr>
                  <td>MCH (pg)</td>
                  <td>{pathologyData.MCH}</td>
                </tr>
                <tr>
                  <td>MCHC (g/l)</td>
                  <td>{pathologyData.MCHC}</td>
                </tr>
                <tr>
                  <td>WBC (x 1013/L)</td>
                  <td>{pathologyData.WBC}</td>
                </tr>
                <tr>
                  <td>Neutrophils (%)</td>
                  <td>{pathologyData.neutrophils}</td>
                </tr>
                <tr>
                  <td>Bands (%)</td>
                  <td>{pathologyData.bands}</td>
                </tr>
                <tr>
                  <td>Lymphocytes (%)</td>
                  <td>{pathologyData.lymphocytes}</td>
                </tr>
                <tr>
                  <td>Monocytes (%)</td>
                  <td>{pathologyData.monocytes}</td>
                </tr>
                <tr>
                  <td>Eosinophils (%)</td>
                  <td>{pathologyData.eosinophils}</td>
                </tr>
                <tr>
                  <td>Platelets (x 1013/l)</td>
                  <td>{pathologyData.platelets}</td>
                </tr>
                <tr>
                  <td>MPV (fl)</td>
                  <td>{pathologyData.mpv}</td>
                </tr>
              </table>
            </div>
            <div>
              <h5>Serum Chemistry</h5>

              <table>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.totalProteinRequired}
                    />
                    Total Protein (g/dl)
                  </td>
                  <td>{pathologyData.totalProtein}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.totalBilirubin}
                    />
                    Total bilirubin (μmol/l)
                  </td>
                  <td>{pathologyData.totalBilirubin}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.conjugatedBilirubinRequired}
                    />
                    Conjugated bilirubin (μmol/l)
                  </td>
                  <td>{pathologyData.conjugatedBilirubin}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.totalBilirubin}
                    />
                    MCH (pg)
                  </td>
                  <td>{pathologyData.MCH}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.sodiumRequired}
                    />
                    Na+ (μmol/l)
                  </td>
                  <td>{pathologyData.sodium}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.potassiumRequired}
                    />
                    K+ (μmol/l)
                  </td>
                  <td>{pathologyData.potassium}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.creatinineRequired}
                    />
                    Creatinine (μmol/l)
                  </td>
                  <td>{pathologyData.creatinine}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.BUNRequired}
                    />
                    BUN ( μmol/l)
                  </td>
                  <td>{pathologyData.BUN}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.albuminRequired}
                    />
                    Albumin (g/dl)
                  </td>
                  <td>{pathologyData.albumin}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.glucoseRequired}
                    />
                    Glucose ( μmol/l)
                  </td>
                  <td>{pathologyData.glucose}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.SGOTASTRequired}
                    />
                    SGOT/AST (IU/L)
                  </td>
                  <td>{pathologyData.SGOTAST}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.SGPTALTRequired}
                    />
                    SGPT/ALT (IUL)
                  </td>
                  <td>{pathologyData.SGPTALT}</td>
                </tr>
                {/* <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.totalBilirubin}
                    />
                    ALP (IU/L)
                  </td>
                  <td>{pathologyData.alp}</td>
                </tr> */}
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.liquidProfileRequired}
                    />
                    Liquid Profile (μmol/l)
                  </td>
                  <td>{pathologyData.liquidProfileRequired}</td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={pathologyData.otherRequired}
                    />
                    Other Specified
                  </td>
                  <td>{pathologyData.other}</td>
                </tr>
              </table>
            </div>
          </div>
          {/* <h5>Differential</h5>
                            <p>
                              {medicalReports.tentativeDiagnosis.differential}
                            </p>

                            <h5>Tentative</h5>
                            <p>{medicalReports.tentativeDiagnosis.tentative}</p> */}
        </CheckinItem>
      )}

      {(parasitologyData.caseHistory || "") && (
        <CheckinItem
          checkedIn={true}
          date={new Date().toString()}
          onDelete={() => setParasitologyData(defaultParasitologyFields)}
          onEdit={() => {
            setToggleParasitology(true);
          }}
          disableDelete
          title="Parasitology Test"
        >
          {/* <h5>Differential</h5>
                            <p>
                              {medicalReports.tentativeDiagnosis.differential}
                            </p>

                            <h5>Tentative</h5>
                            <p>{medicalReports.tentativeDiagnosis.tentative}</p> */}
        </CheckinItem>
      )}

      {(microbiologyData.clinicalDetails || "") && (
        <CheckinItem
          checkedIn={true}
          date={new Date().toString()}
          onDelete={() => setMicrobiologyData(defaultMicrobiologyFields)}
          onEdit={() => {
            setToggleMicrobiology(true);
          }}
          disableDelete
          title="Microbiology Test"
        >
          {/* <h5>Differential</h5>
                            <p>
                              {medicalReports.tentativeDiagnosis.differential}
                            </p>

                            <h5>Tentative</h5>
                            <p>{medicalReports.tentativeDiagnosis.tentative}</p> */}
        </CheckinItem>
      )}

      {(rapidTestData.clinicalDetails || "") && (
        <CheckinItem
          checkedIn={true}
          date={new Date().toString()}
          onDelete={() => setRapidTestData(defaultRapidTestFields)}
          onEdit={() => {
            setToggleRapidtest(true);
          }}
          disableDelete
          title="Rapid Test"
        >
          {/* <h5>Differential</h5>
                            <p>
                              {medicalReports.tentativeDiagnosis.differential}
                            </p>

                            <h5>Tentative</h5>
                            <p>{medicalReports.tentativeDiagnosis.tentative}</p> */}
        </CheckinItem>
      )}
    </section>
  );
};

export default LaboratoryTab;
