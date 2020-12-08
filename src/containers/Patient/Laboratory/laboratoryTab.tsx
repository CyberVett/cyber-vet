import Button, { ButtonTypes } from "components/Button/button";
import CheckinItem from "components/CheckIn/CheckinItem";
import { InputGroup, Label } from "components/Input/input";
import requestClient from "lib/requestClient";
import { formatDate } from "lib/utils";
import React, { useEffect, useState } from "react";
import { date } from "yup";

import styles from "./laboratory.module.scss";
import MicrobiologyModal, {
  IMicrobiologyData,
} from "./Modal/microbiologyModal";
import ParasitologyModal, {
  IParasitologyData,
} from "./Modal/parasitologyModal";
import AddPathologyModal, { IPathologyData } from "./Modal/pathologyModal";
import RapidTestModal, { IRapidTestData } from "./Modal/rapidTestModal";

export const defaultPathologyFields: IPathologyData = {
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

export const defaultParasitologyFields: IParasitologyData = {
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

export const defaultMicrobiologyFields: IMicrobiologyData = {
  natureOfSpecimen: "",
  clinicalDetails: "",
  tentativeDiagnosis: "",
  testsRequired: "",
  result: "",
  dateOfCollection: "",
  dateOfSubmission: "",
};

export const defaultRapidTestFields: IRapidTestData = {
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
  // @ts-ignore
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
    let url = `/laboratory/pathology/${
      method === "create" ? "add" : "complete"
    }`;
    const requestMethod = method === "create" ? "post" : "put";
    if (method === "edit") {
      url = `/laboratory/pathology/update`;
    }
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (
          [201, 200].includes(response.status) &&
          ["Created", "OK"].includes(response.statusText)
        ) {
          setTogglePathology(false);

          _data.createdAt = Date.now();
          if (method === "complete") {
            _data.complete = true;
            _data.dateCompleted = Date.now();
          }
          // @ts-ignore
          setPathologyData(_data);
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
      // @ts-ignore
      delete _data.clientId;
      Object.keys(defaultParasitologyFields).map((key) => {
        // @ts-ignore
        _data[key] = data[key];
      });
    } else {
      _data = { ..._data, ...data };
    }
    let url = `/laboratory/parasitology/${
      method === "create" ? "add" : "complete"
    }`;
    let requestMethod = method === "create" ? "post" : "put";
    if (method === "edit") {
      url = `/laboratory/parasitology/update`;
    }
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (
          [201, 200].includes(response.status) &&
          ["Created", "OK"].includes(response.statusText)
        ) {
          setToggleParasitology(false);
          // @ts-ignore

          _data.createdAt = Date.now();
          if (method == "complete") {
            _data.complete = true;
            _data.dateCompleted = Date.now();
          }
          // @ts-ignore
          setParasitologyData(_data);
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
      // @ts-ignore
      delete _data.clientId;
      Object.keys(defaultMicrobiologyFields).map((key) => {
        // @ts-ignore
        _data[key] = data[key];
      });
    } else {
      _data = { ..._data, ...data };
    }
    let url = `/laboratory/microbiology/${
      method === "create" ? "add" : "complete"
    }`;
    const requestMethod = method === "create" ? "post" : "put";
    if (method === "edit") {
      url = `/laboratory/microbiology/update`;
    }
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (
          [201, 200].includes(response.status) &&
          ["Created", "OK"].includes(response.statusText)
        ) {
          setToggleMicrobiology(false);

          _data.createdAt = Date.now();
          if (method === "complete") {
            _data.complete = true;
            _data.dateCompleted = Date.now();
          }
          // @ts-ignore
          setMicrobiologyData(_data);
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
      // @ts-ignore
      delete _data.clientId;
      Object.keys(defaultRapidTestFields).map((key) => {
        // @ts-ignore
        _data[key] = data[key];
      });
    } else {
      _data = { ..._data, ...data };
    }
    let url = `/laboratory/rapid-test-kit/${
      method === "create" ? "add" : "complete"
    }`;
    const requestMethod = method === "create" ? "post" : "put";
    if (method === "edit") {
      url = `/laboratory/rapid-test-kit/update`;
    }
    requestClient[requestMethod](url, _data)
      .then((response) => {
        setModalLoading(false);
        if (
          [201, 200].includes(response.status) &&
          ["Created", "OK"].includes(response.statusText)
        ) {
          _data.createdAt = Date.now();
          if (method === "complete") {
            _data.complete = true;
            _data.dateCompleted = Date.now();
          }
          // @ts-ignore
          setRapidTestData(_data);
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
      {/* {
        checkInData === null ? <h2 style={{textAlign: 'center'}}>No Lab Activity Recorded</h2> : */}
      <div className={styles.formDetails}>
        <div className={styles.formDetailsInfo}>
          <InputGroup>
            <Label>Check In</Label>
            <input disabled placeholder={formatDate(checkInData?.createdAt)} />
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
            <input
              disabled
              placeholder={`${checkInData?.checkInBy?.firstName} ${checkInData?.checkInBy?.otherName} ${checkInData?.checkInBy?.lastName}`}
            />
          </InputGroup>
          <InputGroup>
            <Label>Check Out</Label>
            <input disabled placeholder={""} />
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
        onEdit={(data: IMicrobiologyData) => {
          saveMicrobiology(data, "edit");
        }}
        onComplete={(data: IMicrobiologyData) => {
          saveMicrobiology(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleMicrobiology(false);
        }}
        isReview={microbiologyData.createdAt}
      />
      <RapidTestModal
        closeModal={() => setToggleRapidtest(false)}
        visible={toggleRapidtest}
        data={rapidTestData}
        onAdd={(data: IRapidTestData) => {
          saveRapidTest(data, "create");
        }}
        onEdit={(data: IRapidTestData) => {
          saveRapidTest(data, "edit");
        }}
        onComplete={(data: IRapidTestData) => {
          saveRapidTest(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleRapidtest(false);
        }}
        isReview={rapidTestData.createdAt}
      />
      <AddPathologyModal
        closeModal={() => setTogglePathology(false)}
        visible={togglePathology}
        data={pathologyData}
        onAdd={(data: IPathologyData) => {
          savePathology(data, "create");
        }}
        onEdit={(data: IPathologyData) => {
          savePathology(data, "edit");
        }}
        onComplete={(data: IPathologyData) => {
          savePathology(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setTogglePathology(false);
        }}
        isReview={pathologyData.createdAt}
      />
      <ParasitologyModal
        closeModal={() => setToggleParasitology(false)}
        visible={toggleParasitology}
        data={parasitologyData}
        onAdd={(data: IParasitologyData) => {
          saveParasitology(data, "create");
        }}
        onEdit={(data: IMicrobiologyData) => {
          saveParasitology(data, "edit");
        }}
        onComplete={(data: IParasitologyData) => {
          saveParasitology(data, "complete");
        }}
        modalLoading={modalLoading}
        onCancel={() => {
          setToggleParasitology(false);
        }}
        isReview={parasitologyData.createdAt}
      ></ParasitologyModal>
      {(checkInData?.pathology || pathologyData.albumin || "") && (
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
                      // @ts-ignore
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
                      // @ts-ignore
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
                      // @ts-ignore
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
        </CheckinItem>
      )}

      {(checkInData?.parasitology || parasitologyData.caseHistory || "") && (
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
          <table className={styles.overviewTable}>
            <tr>
              <td>Case History</td>
              <td>{parasitologyData.caseHistory}</td>
            </tr>
            <tr>
              <td>Tentative Diagnosis</td>
              <td>{parasitologyData.tentativeDiagnosis}</td>
            </tr>
            <tr>
              <td>Test(s) required</td>
              <td>{parasitologyData.testsRequired}</td>
            </tr>
            <tr>
              <td>Condition of specimen</td>
              <td>{parasitologyData.conditionOfSpecimen}</td>
            </tr>
          </table>
          <div className={styles.labCheckinDataListContainer}>
            <div>
              <table>
                <h5>Results</h5>
                <tr>
                  <td>Blood</td>
                  <td>{parasitologyData.bloodResult}</td>
                </tr>
                <tr>
                  <td>PCV (%)</td>
                  <td>{parasitologyData.PCVResult}</td>
                </tr>
                <tr>
                  <td>Wet mount/Blood film/ Haemoparasite</td>
                  <td>{parasitologyData.wetMountResult}</td>
                </tr>
                <tr>
                  <td>Skin Scrapping</td>
                  <td>{parasitologyData.skinScrappingResult}</td>
                </tr>
                <tr>
                  <td>Feacal analysis - Egg/ Oocyst/Parasite Count</td>
                  <td>{parasitologyData.facialAnalysisResult}</td>
                </tr>
                <tr>
                  <td>Urine Analysis</td>
                  <td>{parasitologyData.urineAnalysisResult}</td>
                </tr>
              </table>
            </div>
            <div>
              <h5>Sample Submitted</h5>
              <table>
                <tr>
                  <td>Blood</td>
                  <td>
                    {parasitologyData.bloodSampleSubmitted ? "Yes" : "No"}
                  </td>
                </tr>
                <tr>
                  <td>Urine</td>
                  <td>
                    {parasitologyData.urineSampleSubmitted ? "Yes" : "No"}
                  </td>
                </tr>

                <tr>
                  <td>Skin scrapping</td>
                  <td>
                    {parasitologyData.skinScrappingSampleSubmitted
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>

                <tr>
                  <td>Stool</td>
                  <td>
                    {parasitologyData.stoolSampleSubmitted ? "Yes" : "No"}
                  </td>
                </tr>

                <tr>
                  <td>Other</td>
                  <td>
                    {parasitologyData.otherSampleSubmitted ? "Yes" : "No"}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </CheckinItem>
      )}

      {(checkInData?.microbiology ||
        microbiologyData.clinicalDetails ||
        "") && (
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
          <table className={styles.overviewTable}>
            <tr>
              <td>Nature of specimen</td>
              <td>{microbiologyData?.natureOfSpecimen}</td>
            </tr>
            <tr>
              <td>Date of collection</td>
              <td>
                {
                  // @ts-ignore
                  formatDate(microbiologyData?.dateOfCollection)
                }
              </td>
            </tr>
            <tr>
              <td>Date of Submission</td>
              <td>
                {
                  // @ts-ignore
                  formatDate(microbiologyData?.dateOfSubmission)
                }
              </td>
            </tr>
            <tr>
              <td>Clinical Details</td>
              <td>{microbiologyData?.clinicalDetails}</td>
            </tr>
            <tr>
              <td>Tentative Diagnosis</td>
              <td>{microbiologyData?.tentativeDiagnosis}</td>
            </tr>
            <tr>
              <td>Tests Required</td>
              <td>{microbiologyData?.testsRequired}</td>
            </tr>
            <tr>
              <td>Result</td>
              <td>{microbiologyData?.result}</td>
            </tr>
          </table>
        </CheckinItem>
      )}

      {(checkInData?.rapidTest || rapidTestData?.clinicalDetails || "") && (
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
          <table className={styles.overviewTable}>
            <tr>
              <td>Type of specimen</td>
              <td>{rapidTestData?.typeOfSpecimen}</td>
            </tr>
            <tr>
              <td>Clinical Details</td>
              <td>{rapidTestData?.clinicalDetails}</td>
            </tr>
            <tr>
              <td>Tentative Diagnosis</td>
              <td>{rapidTestData?.tentativeDiagnosis}</td>
            </tr>
            <tr>
              <td>Tests Required</td>
              <td>{rapidTestData?.testsRequired}</td>
            </tr>
            <tr>
              <td>Result</td>
              <td>{rapidTestData?.result}</td>
            </tr>
          </table>
        </CheckinItem>
      )}
    </section>
  );
};

export default LaboratoryTab;
