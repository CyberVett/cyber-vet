import Button, { ButtonTypes } from "components/Button/button";
import CheckinItem from "components/CheckIn/CheckinItem";
import { InputGroup, Label } from "components/Input/input";
import requestClient from "lib/requestClient";
import React, { useState } from "react";

import styles from "./laboratory.module.scss";
import MicrobiologyModal from "./Modal/microbiologyModal";
import ParasitologyModal, {
  IParasitologyData,
} from "./Modal/parasitologyModal";
import AddPathologyModal, { IPathologyData } from "./Modal/pathologyModal";
import RapidTestModal from "./Modal/rapidTestModal";

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

const defaultPrasitologyFields: IParasitologyData = {
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
    checkInData.pathology || defaultPrasitologyFields
  );
  const [pathologyData, setPathologyData] = useState<IPathologyData>(
    checkInData.parasitology || defaultPathologyFields
  );

  const onCreateData = (
    data: IPathologyData,
    endpoint: string,
    callback: Function
  ) => {
    // console.l
  };

  const savePathology = (data: IPathologyData, method = "create") => {
    setModalLoading(true);

    const _data = {
      checkinId: checkInData.id,
      patientId: patientData.id,
      ...data,
    };
    delete _data.nameOfTechnologist;
    delete _data.id;
    delete _data.completed;
    delete _data.dateCompleted;
    if (method !== "create") {
      delete _data.clientId;
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

    const _data = {
      checkinId: checkInData.id,
      patientId: patientData.id,
      ...data,
    };
    delete _data.nameOfTechnologist;
    delete _data.id;
    delete _data.completed;
    delete _data.dateCompleted;
    if (method !== "create") {
      delete _data.clientId;
    }
    const url = `/laboratory/parasitology/${
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
      />
      <RapidTestModal
        closeModal={() => setToggleRapidtest(false)}
        visible={toggleRapidtest}
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
        data={ParasitologyModal}
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
      ></ParasitologyModal>
      {(pathologyData.albumin || "") && (
        <CheckinItem
          checkedIn={checkInData.checkIn}
          date={new Date().toString()}
          onDelete={() => setPathologyData(defaultPathologyFields)}
          onEdit={() => {
            setTogglePathology(true);
          }}
          disableDelete
          title="Pathology Test"
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
